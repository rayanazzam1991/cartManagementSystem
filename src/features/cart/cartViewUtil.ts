import { computed, ref } from 'vue'
import type { CartItem } from '@/features/cart/cartStore'
import type { CartDetailsViewEmits, CartDetailsViewProps } from '@/features/cart/components/CartDetailsView.vue'

export const cartViewDetailsUtil = (
  props: CartDetailsViewProps,
  emit: CartDetailsViewEmits) => {

  const shippingFeesAmount = 40
  const taxesAmount = 10
  const couponNumber = ref()

  const subtotal = computed(() => {
    return Number(props.cartItems.reduce((acc: number, item: CartItem) => {
      return acc + item.totalPrice
    }, 0)).toFixed(2)
  })

  const total = computed(() => {
    const totalBeforeTaxes = Number(Number(subtotal.value) + shippingFeesAmount)
    const totalAfterTax = Number(totalBeforeTaxes * (1 + (taxesAmount / 100)))
    return (totalAfterTax - (props.discount ?? 0)).toFixed(2)
  })

  const removeItemFromCart = (itemId: number, quantity: number) => {
    emit('removeItem', itemId, quantity)
  }
  const updateItemQuantity = (itemId: number, count: number) => {
    emit('updateQuantity', itemId, count)
  }
  const applyCoupon = () => {
    emit('applyCoupon', couponNumber.value)
  }

  return {
    subtotal,
    total,
    couponNumber,
    shippingFeesAmount,
    taxesAmount,
    removeItemFromCart,
    updateItemQuantity,
    applyCoupon
  }
}