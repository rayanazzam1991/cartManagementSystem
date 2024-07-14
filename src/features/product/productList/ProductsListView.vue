<script setup lang="ts">
import type { Product } from '@/products'
import ProductListItem from '@/features/product/productList/ProductListItem.vue'
import ProductItemLoader from '@/features/product/productList/ProductItemLoader.vue'

const props = defineProps<{
  productsList: Product[] | null,
  productsLoading: boolean
}>()
</script>

<template>
  <div class="product-list">
    <template v-if="props.productsLoading">
      <ProductItemLoader
        :key="n"
        v-for="n in 6" />
    </template>
    <ProductListItem
      v-for="(item,index) in props.productsList"
      :product="item"
      :index="index"
      :key="item.id" />
  </div>
</template>

<style scoped>

</style>