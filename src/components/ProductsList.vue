<script setup lang="ts">
import type { Product } from '@/products'
import ProductListItem from '@/components/ProductListItem.vue'

const props = defineProps<{
  productsList: Product[] | null,
}>()
</script>

<template>
    <div class="product-list">
      <ProductListItem
        v-for="(item,index) in props.productsList"
        :product="item"
        :index="index"
        :key="item.id" />
    </div>
</template>

<style scoped>

</style>