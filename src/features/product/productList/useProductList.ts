import { useProductStore } from '@/features/product/productStore'
import { computed, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { convertToSlug } from '@/util/stringHelper'
import { useCartStore } from '@/features/cart/cartStore'
import { useToast } from '@/composables/useToast'

export const useProductList = () => {
  const productStore = useProductStore()
  const { loading: productsLoading } = storeToRefs(useProductStore())

  const productsList = computed(() => {
    return productStore.products
  })

  onBeforeMount( () => {
     productStore.getProductsFromApi()
  })
  return {
    productsList,
    productsLoading
  }
}

export const useProductItem = () => {
  const router = useRouter()

  const showDetails = async (productId: number, productName: string) => {
    const productSlug = convertToSlug(productName)
    await router.push({ name: 'product.details', params: { id: productId, slug: productSlug } })
  }
  const cartStore = useCartStore()
  const toast = useToast()

  const addToCart = (itemId: number) => {
    cartStore.addToCart(itemId)
    toast?.dismissAll()
    toast?.success('Added to Cart Successfully')
  }
  return {
    showDetails,
    addToCart
  }
}