<script setup lang="ts">
import TopHeader from '@/components/layout/TopHeader.vue'
import { useCartStore } from '@/features/cart/cartStore'
import { useProductStore } from '@/features/product/productStore'
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
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
<style scoped>
/* Define the transition effect */
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
}

.page-enter, .page-leave-to /* .page-leave-active in <2.1.8 */
{
  opacity: 0;
}
</style>
