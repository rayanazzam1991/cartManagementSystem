<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import type { Product } from '@/products'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
onBeforeMount(() => {
  productStore.getProductsFromApi()
})
</script>

<template>
  <ProductsList :productsList="productStore.products" />
</template>
