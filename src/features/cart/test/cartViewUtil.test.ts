import {  beforeEach, describe, expect, it, vi } from 'vitest'
import { cartViewDetailsUtil } from '@/features/cart/cartViewUtil'
import type { CartItem } from '@/features/cart/cartStore'
import type { CartDetailsViewProps } from '@/features/cart/components/CartDetailsView.vue'

describe('cartViewDetailsUtil', () => {
  let cartItems: CartItem[]
  let props: CartDetailsViewProps
  let emit: any

  beforeEach(() => {
    cartItems = [
      { id: 1, title: 'Item 1', unitPrice: 50, quantity: 2, totalPrice: 100, image: 'image1.jpg' },
      { id: 2, title: 'Item 2', unitPrice: 30, quantity: 3, totalPrice: 90, image: 'image2.jpg' }
    ]
    props = { cartItems, productsLoading: false, discount: 10 }
    emit = vi.fn()
  })

  it('calculates subtotal correctly', () => {
    const { subtotal } = cartViewDetailsUtil(props, emit)
    expect(subtotal.value).toBe('190.00')
  })

  it('calculates total correctly', () => {
    const { total } = cartViewDetailsUtil(props, emit)
    expect(total.value).toBe('243.00')
  })

  it('emits removeItem event correctly', () => {
    const { removeItemFromCart } = cartViewDetailsUtil(props, emit)
    removeItemFromCart(1, 2)
    expect(emit).toHaveBeenCalledWith('removeItem', 1, 2)
  })

  it('emits updateQuantity event correctly', () => {
    const { updateItemQuantity } = cartViewDetailsUtil(props, emit)
    updateItemQuantity(2, 4)
    expect(emit).toHaveBeenCalledWith('updateQuantity', 2, 4)
  })

  it('emits applyCoupon event correctly', () => {
    const { applyCoupon, couponNumber } = cartViewDetailsUtil(props, emit)
    couponNumber.value = 'COUPON2023'
    applyCoupon()
    expect(emit).toHaveBeenCalledWith('applyCoupon', 'COUPON2023')
  })
})