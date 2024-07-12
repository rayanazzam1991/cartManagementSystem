<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import router from '@/router'
import LogoSVG from '@/components/basic/LogoSVG.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="top-header">
    <div class="logo">
      <LogoSVG @click="router.push({path:'/'})" />
    </div>
    <div class="top-right">
      <div class="top-cart-icon-wrapper">
        <ShoppingBagIcon class="top-cart-icon" @click="router.push({path:'/cart'})" />
        <span class="top-cart-count-badge">{{ cartStore.getCartCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>