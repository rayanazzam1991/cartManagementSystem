<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { onBeforeMount } from 'vue'

const productStore = useProductStore()
onBeforeMount(() => {
  productStore.getProductsFromApi()
})
const cartStore = useCartStore()

cartStore.$subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(cartStore.cartContent))
})
</script>


<template>
  <div class="app">
    <TopHeader />
    <RouterView />
  </div>
</template>
