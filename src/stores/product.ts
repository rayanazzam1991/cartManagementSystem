import { defineStore } from 'pinia'
import { ref } from 'vue'
import { products as ProductsList, type Product } from '@/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([] as Product[])

  async function getProductsFromApi() {
    return setTimeout(() => {
      products.value = ProductsList
    }, 500)
  }

  function getProductById(id: number) {
    return products.value?.find((item: Product) => item.id === id) as Product | null
  }

  return {
    products,
    getProductsFromApi,
    getProductById
  }
})