<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue'
import { onBeforeMount} from 'vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
onBeforeMount(() => {
  productStore.getProductsFromApi()
})

</script>

<template>
  <ProductsList :productsList="productStore.products" :productsLoading="productStore.loading" />
</template>
