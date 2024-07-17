import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import * as cartHooks from '@/features/cart/useCartHooks'
import { computed, ref } from 'vue'
import type { CartItem } from '@/features/cart/cart'
import Cart from '@/features/cart/components/Cart.vue'

const mockedCartItems = computed(() => {
  return [{
    id: 1,
    title: 'test',
    unitPrice: 10,
    totalPrice: 20,
    image: 'test.png',
    quantity: 2

  }] as CartItem[]
})
const mockedProductLoading = ref(false)

const useCartSpy = vi.spyOn(cartHooks, 'useCart')
const mockedSubtotal = computed(() => {
  return '1.00'
})
const mockedTotal = computed(() => {
  return '1.00'
})
const mockedCoupon = computed(() => {
  return '12234'
})
vi.spyOn(cartHooks, 'useCartDetails').mockReturnValue({
  subtotal: mockedSubtotal,
  total: mockedTotal,
  removeItemFromCart: vi.fn(),
  updateItemQuantity: vi.fn(),
  applyCoupon: vi.fn(),
  shippingFeesAmount: 0,
  taxesAmount: 0,
  couponNumber: mockedCoupon
})
describe('CartDetailsView component', () => {

  let wrapper: VueWrapper<InstanceType<typeof CartDetailsView>>

  afterEach(() => {
    useCartSpy.mockClear()
  })

  it('should renders correctly', () => {
    wrapper = mount(CartDetailsView)
    expect(wrapper.exists()).toBe(true)
  })

  it('should have CartDetailsView with correct props', () => {
    useCartSpy.mockReturnValue({
      cartItems: mockedCartItems,
      productsLoading: mockedProductLoading,
      handleRemoveItem: vi.fn(),
      handleUpdateQuantity: vi.fn()
    })
    wrapper = mount(Cart)
    const cartDetailsViewComponent = wrapper.findComponent(CartDetailsView)
    expect(cartDetailsViewComponent.exists()).toBe(true)

    // should have props
    expect(cartDetailsViewComponent.props().cartItems).toEqual(mockedCartItems.value)
    expect(cartDetailsViewComponent.props().productsLoading).toEqual(mockedProductLoading.value)

  })
})