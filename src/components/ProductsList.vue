<script setup lang="ts">
import type { Product } from '@/products'
import ProductListItem from '@/components/ProductListItem.vue'
import ProductItemLoader from '@/components/ProductItemLoader.vue'

const props = defineProps<{
  productsList: Product[] | null,
  productsLoading: boolean
}>()
</script>

<template>
  <div class="product-list">
    <ProductItemLoader
      v-show="props.productsLoading"
      :key="n"
      v-for="n in 6" />
    <ProductListItem
      v-for="(item,index) in props.productsList"
      :product="item"
      :index="index"
      :key="item.id" />
  </div>
</template>

<style scoped>

</style>