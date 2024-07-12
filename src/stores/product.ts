import { defineStore } from 'pinia'
import { ref } from 'vue'
import { products as ProductsList, type Product } from '@/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([] as Product[])
  const loading = ref(false)

  async function getProductsFromApi() {
    loading.value = true
    return setTimeout(() => {
      products.value = ProductsList
      loading.value = false
    }, 1500)
  }

  function getProductById(id: number) {
    return products.value?.find((item: Product) => item.id === id) as Product | null
  }

  return {
    products,
    loading,
    getProductsFromApi,
    getProductById
  }
})