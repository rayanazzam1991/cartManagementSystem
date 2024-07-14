<script setup lang="ts">
import ProductsListView from '@/features/product/productList/ProductsListView.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useProductList } from '@/features/product/productList/useProductList'


const { productsList, productsLoading } = useProductList()

</script>

<template>
  <PageLayout>
    <ProductsListView :productsList :productsLoading />
  </PageLayout>
</template>
