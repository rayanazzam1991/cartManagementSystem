import { type RouteParams, useRoute } from 'vue-router'
import { useProductStore } from '@/features/product/productStore'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from '@/composables/useToast'

export const useProductDetails = () => {

  const route = useRoute()
  const productStore = useProductStore()
  const toast = useToast()
  const { loading: productLoading } = storeToRefs(useProductStore())

  const productId = computed(() => {
    const { id }: RouteParams = route.params
    return parseInt(Array.isArray(id) ? id[0].toString() : id.toString())
  })
  const product = computed(() => {
    return productStore.getProductById(productId.value)
  })
  const addToCart = (itemId: number, quantity: number) => {
    productStore.askForAddingProductToCart(itemId, quantity)
    toast?.dismissAll()
    toast?.success('Added to Cart Successfully')
  }

  return {
    product,
    productLoading,
    addToCart
  }
}