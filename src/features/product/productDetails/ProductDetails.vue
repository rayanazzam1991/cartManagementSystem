<script setup lang="ts">
import ProductDetailsView from '@/features/product/productDetails/ProductDetailsView.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import ProductDetailsLoader from '@/features/product/productDetails/ProductDetailsLoader.vue'
import { useProductDetails } from '@/features/product/productDetails/useProductDetails'

const { product, productLoading, addToCart } = useProductDetails()
</script>

<template>
  <PageLayout>
    <ProductDetailsLoader v-if="productLoading" />
    <ProductDetailsView v-else
                        :product="product"
                        @addToCart="addToCart" />
  </PageLayout>
</template>
