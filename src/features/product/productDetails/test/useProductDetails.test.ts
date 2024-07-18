import { useProductDetails } from '@/features/product/productDetails/useProductDetails'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/features/product/productStore'
import { useToast } from '@/composables/useToast'
import { ref } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import * as Toast from '@/composables/useToast'

// Mocking vue-router
vi.mock('vue-router', () => ({
  useRoute: vi.fn()
}))

vi.spyOn(Toast,"useToast").mockReturnValue({
  dismiss: vi.fn(),
  dismissAll: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  info:vi.fn(),
  warning: vi.fn(),
  primary: vi.fn(),
})

describe('useProductDetails', () => {
  let mockRouteParams: any
  let mockProduct: any
  let mockProductLoading: any
  const pinia = createTestingPinia()
  let productStore : ReturnType<typeof useProductStore>
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()

    // Mocking route params
    mockRouteParams = { params: { id: '1' } }
    //@ts-ignore
    useRoute.mockReturnValue(mockRouteParams)

    mockProduct = { id: 1, title: 'Sample Product' }
    mockProductLoading = ref(false)

    productStore =useProductStore(pinia)

  })

  it('returns correct product based on route params', () => {
    productStore.getProductById = vi.fn().mockReturnValue(mockProduct)
    const { product } = useProductDetails()
    expect(product.value).toEqual(mockProduct)
    expect(productStore.getProductById).toHaveBeenCalledWith(1)
  })

  it('returns correct loading state', () => {
    const { productLoading } = useProductDetails()
    expect(productLoading.value).toBe(false)
  })

  it('addToCart calls store method and shows toast message', () => {
    const { addToCart } = useProductDetails()
    addToCart(1, 2)
    expect(productStore.askForAddingProductToCart).toHaveBeenCalledWith(1, 2)
    expect(useToast()?.dismissAll).toHaveBeenCalled()
    expect(useToast()?.success).toHaveBeenCalledWith('Added to Cart Successfully')
  })
})