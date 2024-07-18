import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia, type TestingPinia } from '@pinia/testing'
import { type CartItem, useCartStore } from '@/features/cart/cartStore'
import { useCart } from '@/features/cart/useCart'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { computed } from 'vue'
import  Cart from '@/features/cart/components/Cart.vue'
import { useToast } from '@/composables/useToast'

describe('useCart', () => {

  let pinia: TestingPinia
  let wrapper: VueWrapper<InstanceType<typeof Cart>>
  let cartStore :ReturnType<typeof useCartStore>

  beforeEach(() => {
    pinia = createTestingPinia()
    cartStore = useCartStore(pinia)
  })


  it('fetches cart content on mount', () => {
    cartStore.getCartContent = vi.fn()
    wrapper = shallowMount(Cart)
    expect(cartStore.getCartContent).toHaveBeenCalledTimes(1)
  })

  it('handles removing item from cart', () => {

    cartStore.removeFromCart = vi.fn()
    const toast = useToast()

    const { handleRemoveItem } = useCart()
    handleRemoveItem(1, 2)

    expect(cartStore.removeFromCart).toHaveBeenCalledWith(1, 2)
    expect(toast?.dismissAll).toHaveBeenCalled()
    setTimeout(() => {
      expect(toast?.warning).toHaveBeenCalledWith('Removed from cart Successfully')
    }, 500)
  })
  //
  it('handles updating item quantity in cart', () => {

    cartStore.updateQuantity = vi.fn()
    const toast = useToast()

    const { handleUpdateQuantity } = useCart()
    handleUpdateQuantity(1, 3)

    expect(cartStore.updateQuantity).toHaveBeenCalledWith(1, 3)
    expect(toast?.dismissAll).toHaveBeenCalled()
    setTimeout(() => {
      expect(toast?.success).toHaveBeenCalledWith('Cart Updated Successfully')
    }, 500)
  })

  it('returns cart items', () => {
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
    cartStore.getCartContent = vi.fn(() => mockedCartItems.value)

    const { cartItems } = useCart()

    expect(cartItems.value).toEqual(mockedCartItems.value)
  })

  it('applies valid coupon correctly', () => {
    const toast = useToast()
    const { handleCoupon, discount } = useCart()
    handleCoupon(12345)

    expect(discount.value).toBe(10)
    expect(toast?.dismissAll).toHaveBeenCalled()
    expect(toast?.success).toHaveBeenCalledWith('Coupon applied to total!')
  })

  it('handles invalid coupon correctly', () => {
    const toast = useToast()
    const { handleCoupon, discount } = useCart()
    handleCoupon(11111)

    expect(discount.value).toBe(0)
    expect(toast?.dismissAll).toHaveBeenCalled()
    expect(toast?.warning).toHaveBeenCalledWith('Invalid coupon number')
  })
})