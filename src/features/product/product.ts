import { defineStore } from 'pinia'
import { ref } from 'vue'
import { products as ProductsList, type Product } from '@/products'
import { useCartStore } from '@/features/cart/cart'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([] as Product[])
  const loading = ref(false)

  // in this function I am simulating API call from backend, so I added delay with 1000 ms.
  async function getProductsFromApi() {
    loading.value = true
    setTimeout(() => {
      products.value = ProductsList
      loading.value = false
    }, 1000)
  }

  function getProductById(id: number) {
    return ProductsList?.find((item: Product) => item.id === id) as Product | null
  }

  function askForAddingProductToCart(itemId: number, quantity: number) {
    const { addToCart } = useCartStore()
    addToCart(itemId, quantity)
  }

  return {
    products,
    loading,
    getProductsFromApi,
    getProductById,
    askForAddingProductToCart
  }
})