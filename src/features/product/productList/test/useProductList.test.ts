import { useProductList, useProductItem } from '@/features/product/productList/useProductList'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/features/product/productStore'
import { useToast } from '@/composables/useToast'
import { useCartStore } from '@/features/cart/cartStore'
import { computed, ref } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { convertToSlug } from '@/util/stringHelper'
import * as Toast from '@/composables/useToast'
import { mount, shallowMount } from '@vue/test-utils'
import ProductList from '@/features/product/productList/ProductList.vue'
import ProductListItem from '@/features/product/productList/ProductListItem.vue'

// Mocking vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

// Mocking useToast
vi.spyOn(Toast,"useToast").mockReturnValue({
  dismiss: vi.fn(),
  dismissAll: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  info:vi.fn(),
  warning: vi.fn(),
  primary: vi.fn(),
})

describe('useProductList', () => {
  let mockProducts: any
  let mockLoading: any
  const pinia = createTestingPinia()
  let productStore : ReturnType<typeof useProductStore>
  let cartStore : ReturnType<typeof useCartStore>
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()

    mockProducts = [{ id: 1, title: 'Product 1' }]
    mockLoading = ref(false)
    productStore = useProductStore(pinia)
    cartStore = useCartStore(pinia)

  })

  it('returns correct product list', () => {
    productStore.products = mockProducts
    const { productsList } = useProductList()
    expect(productsList.value).toEqual(mockProducts)
  })

  it('returns correct loading state', () => {
    const { productsLoading } = useProductList()
    expect(productsLoading.value).toBe(false)
  })

  it('fetches products on mount', async () => {
    shallowMount(ProductList)
    expect(productStore.getProductsFromApi).toHaveBeenCalledTimes(1)
  })

})

describe('useProductItem', () => {
  let router: any

  let mockProducts: any
  let mockLoading: any
  const pinia = createTestingPinia()
  let productStore : ReturnType<typeof useProductStore>
  let cartStore : ReturnType<typeof useCartStore>
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()

    router = {
      push: vi.fn()
    }
    //@ts-ignore
    useRouter.mockReturnValue(router)

    mockProducts = [{ id: 1, title: 'Product 1' }]
    mockLoading = ref(false)
    productStore = useProductStore(pinia)
    cartStore = useCartStore(pinia)

  })


  it('showDetails navigates to product details page', async () => {
    const { showDetails } = useProductItem(router)
    const productId = 1
    const productName = 'Product 1'
    const productSlug = convertToSlug(productName)

    await showDetails(productId, productName)
    expect(router.push).toHaveBeenCalledWith({ name: 'product.details', params: { id: productId, slug: productSlug } })
  })

  it('addToCart adds item to cart and shows toast message', () => {
    const { addToCart } = useProductItem(router)
    const itemId = 1

    addToCart(itemId)
    expect(cartStore.addToCart).toHaveBeenCalledWith(itemId)
    expect(useToast()?.dismissAll).toHaveBeenCalled()
    expect(useToast()?.success).toHaveBeenCalledWith('Added to Cart Successfully')
  })
})