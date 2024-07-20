import { mount } from '@vue/test-utils'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import type { Product } from '@/products'
import * as ProductDetailsComposable from '@/features/product/productDetails/useProductDetails'
import ProductDetails from '@/features/product/productDetails/ProductDetails.vue'
import ProductDetailsLoader from '@/features/product/productDetails/ProductDetailsLoader.vue'
import ProductDetailsView from '../../ProductDetailsView.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

vi.mock('vue-router')
// Mock the composable functions
const productItemSample: Product =
  {
    'id': 1,
    'title': 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    'price': 109.95,
    'description': 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    'category': 'men\'s clothing',
    'image': 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'rating': {
      'rate': 3.9,
      'count': 120
    }
  }
const mockedProduct = computed(() => {
  return productItemSample
})
const mockedLoading = ref<boolean>(true)

const spy = vi.spyOn(ProductDetailsComposable, 'useProductDetails')
const mockRoute = {
  params: {
    id: 1
  }
}

describe('ProductDetailsComponent', () => {
  beforeEach(() => {

    //@ts-ignore
    useRoute.mockReturnValue(mockRoute)
    // Reset mock return values before each test
    vi.clearAllMocks()

  })

  it('Should render productList component without crashing', () => {
    const wrapper = mount(ProductDetails)
    expect(wrapper.exists()).toBe(true)
  })

  it('should renders ProductDetailsLoader when productLoading is true', () => {
    spy.mockReturnValue({
      product: mockedProduct,
      productLoading: mockedLoading,
      addToCart: vi.fn()
    })
    const wrapper = mount(ProductDetails)

    // Check for ProductDetailsLoader
    const loader = wrapper.findComponent(ProductDetailsLoader)
    expect(loader.exists()).toBe(true)

    // Ensure ProductDetails is not rendered
    const details = wrapper.findComponent(ProductDetailsView)
    expect(details.exists()).toBe(false)
  })

  it('should renders ProductDetails when productLoading is false', () => {
    mockedLoading.value = false
    spy.mockReturnValue({
      product: mockedProduct,
      productLoading: mockedLoading,
      addToCart: vi.fn()
    })

    const wrapper = mount(ProductDetails)

    // Check for ProductDetails
    const details = wrapper.findComponent(ProductDetailsView)
    expect(details.exists()).toBe(true)
    expect(details.props('product')).toEqual(mockedProduct.value)

    // Ensure ProductDetailsLoader is not rendered
    const loader = wrapper.findComponent(ProductDetailsLoader)
    expect(loader.exists()).toBe(false)
  })
})