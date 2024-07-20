import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import * as cartHooks from '@/features/cart/useCart'
import { computed, ref } from 'vue'
import type { CartItem } from '@/features/cart/cartStore'
import Cart from '@/features/cart/components/CartDetails.vue'

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
const mockedDiscount = ref(0)

const useCartSpy = vi.spyOn(cartHooks, 'useCart')

describe('Cart', () => {

  let wrapper: VueWrapper<InstanceType<typeof Cart>>

  afterEach(() => {
    useCartSpy.mockClear()
  })

  it('should renders correctly', () => {
    wrapper = mount(Cart)
    expect(wrapper.exists()).toBe(true)
  })
  it('should have CartDetailsView with correct props', () => {
    useCartSpy.mockReturnValue({
      cartItems: mockedCartItems,
      productsLoading: mockedProductLoading,
      discount: mockedDiscount,
      handleRemoveItem: vi.fn(),
      handleUpdateQuantity: vi.fn(),
      handleCoupon:vi.fn()
    })
    wrapper = mount(Cart)
    const cartDetailsViewComponent = wrapper.findComponent(CartDetailsView)
    expect(cartDetailsViewComponent.exists()).toBe(true)

    // should have props
    expect(cartDetailsViewComponent.props().cartItems).toEqual(mockedCartItems.value)
    expect(cartDetailsViewComponent.props().productsLoading).toEqual(mockedProductLoading.value)

  })
})