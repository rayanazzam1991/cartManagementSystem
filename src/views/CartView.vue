<script setup lang="ts">
import Cart from '@/components/Cart.vue'
import { useCartStore } from '@/stores/cart'

const {getCartContent} = useCartStore()
console.log(getCartContent())
</script>

<template>
  <Cart :items="getCartContent()"/>
</template>
