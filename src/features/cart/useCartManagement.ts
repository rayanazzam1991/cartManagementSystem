import { type CartItem, useCartStore } from '@/features/cart/cart'
import { useToast } from '@/composables/useToast'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/features/product/product'
import { computed, onBeforeMount, reactive, ref } from 'vue'

export const useCartManagement = () => {
  const cartStore = useCartStore()
  const toast = useToast()
  const { loading: productsLoading } = storeToRefs(useProductStore())

  onBeforeMount(() => {
    cartStore.getCartContent()
  })

  const handleRemoveItem = (itemId: number, quantity: number) => {
    cartStore.removeFromCart(itemId, quantity)
    toast?.dismissAll()
    setTimeout(() => {
      toast?.warning('Removed from cart Successfully')
    }, 500)


  }
  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    cartStore.updateQuantity(itemId, quantity)
    toast?.dismissAll()
    setTimeout(() => {
      toast?.success('Cart Updated Successfully')
    }, 500)
  }
  const items = computed(() => {
    return cartStore.getCartContent()
  })
  return {
    items,
    productsLoading,
    handleRemoveItem,
    handleUpdateQuantity
  }
}

export const useCartDetails = (
  props: any,
  emit: ReturnType<typeof defineEmits>) => {

  const shippingFeesAmount = 40
  const taxesAmount = 10
  const discount = ref(0)
  const toast = useToast()
  type Coupon = {
    value: string,
    discount: number
  }
  const coupons = reactive<Coupon[]>([
    { value: '12345', discount: 10 },
    { value: '12349', discount: 15 }
  ])

  const subtotal = computed(() => {
    return Number(props.items.reduce((acc: number, item: CartItem) => {
      return acc + item.totalPrice
    }, 0)).toFixed(2)
  })
  const total = computed(() => {
    const totalBeforeTaxes = Number(Number(subtotal.value) + shippingFeesAmount)
    const totalAfterTax = Number(totalBeforeTaxes * (1 + (taxesAmount / 100)))
    return (totalAfterTax - discount.value).toFixed(2)
  })
  const removeItemFromCart = (itemId: number, quantity: number) => {
    emit('removeItem', itemId, quantity)
  }
  const updateItemQuantity = (itemId: number, count: number) => {
    emit('updateQuantity', itemId, count)
  }
  const couponNumber = ref()
  const applyCoupon = () => {
    const validCoupon = coupons.find((item) => item.value === couponNumber.value)
    if (validCoupon) {
      discount.value = validCoupon.discount
      toast?.dismissAll()
      toast?.success('Coupon applied to total!')
    } else {
      toast?.dismissAll()
      toast?.warning('Invalid coupon number')
    }
  }
  return {
    subtotal,
    total,
    removeItemFromCart,
    updateItemQuantity,
    applyCoupon,
    shippingFeesAmount,
    taxesAmount,
    couponNumber
  }
}