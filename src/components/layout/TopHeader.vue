<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import router from '@/router'
import LogoSVG from '@/components/element/LogoSVG.vue'
import { useCartStore } from '@/features/cart/cart'
import { ref, watch } from 'vue'

const cartStore = useCartStore()
const isBouncing = ref(false)
// Watch for changes in cart count to trigger the bounce animation
watch(() => cartStore.getCartCount, () => {
  isBouncing.value = true
})
</script>

<template>
  <div class="top-header">
    <div class="logo">
      <LogoSVG @click="router.push({path:'/'})" />
    </div>
    <div class="top-right">
      <div class="top-cart-icon-wrapper">
        <ShoppingBagIcon class="top-cart-icon" @click="router.push({path:'/cart'})" />
        <Transition name="bounce" mode="out-in">
        <span class="top-cart-count-badge" v-if="cartStore.getCartCount > 0" :key="cartStore.getCartCount">
        {{ cartStore.getCartCount }}
      </span>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>