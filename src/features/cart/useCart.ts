import {  useCartStore } from '@/features/cart/cartStore'
import { useToast } from '@/composables/useToast'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/features/product/productStore'
import { computed, onBeforeMount, reactive, ref } from 'vue'


export type Coupon = {
  value: string,
  discount: number
}
export const useCart = () => {
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
  const cartItems = computed(() => {
    return cartStore.getCartContent()
  })

  const coupons = reactive<Coupon[]>([
    { value: '12345', discount: 10 },
    { value: '12349', discount: 15 }
  ])

  const discount = ref(0)
  const handleCoupon = (couponNumber: number) => {
    const validCoupon = coupons.find((item) => Number(item.value) === Number(couponNumber))
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
    cartItems,
    productsLoading,
    discount,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCoupon
  }
}
