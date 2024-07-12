<script setup lang="ts">
import { type RouteParams, useRoute } from 'vue-router'
import { computed } from 'vue'
import ProductDetails from '@/components/ProductDetails.vue'
import { useProductStore } from '@/stores/product'
import ProductDetailsLoader from '@/components/ProductDetailsLoader.vue'

const route = useRoute()
const { getProductById } = useProductStore()

const productId = computed(() => {
  const { id }: RouteParams = route.params
  return parseInt(Array.isArray(id) ? id[0].toString() : id.toString())
})

</script>

<template>
  <RouterView :key="route.fullPath">
<!--    <ProductDetailsLoader />-->
    <ProductDetails :product="getProductById(productId)" />
  </RouterView>
</template>
