<script setup lang="ts">
import Cart from '@/components/Cart.vue'
import { useCartStore } from '@/stores/cart'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import { useToast } from '@/composables/useToast'

const cartStore = useCartStore()
const toast = useToast()
const {loading} = storeToRefs(useProductStore())
const handleRemoveItem = (itemId: number, quantity: number) => {
  cartStore.removeFromCart(itemId, quantity)
  toast?.dismissAll()
  toast?.warning('Removed from cart Successfully')
}
const handleUpdateQuantity = (itemId: number, quantity: number) => {
  cartStore.updateQuantity(itemId, quantity)
  toast?.dismissAll()
  toast?.success('Cart Updated Successfully')
}
</script>

<template>
  <div class="cart-no-items" v-if="cartStore.getCartCount === 0">
    <span>No Items</span>
    <router-link class="btn btn-primary" :to="{path:'/'}">Go to Shop</router-link>
  </div>
  <Cart
    v-else
    :items="cartStore.getCartContent"
    :products-loading="loading"
    @removeItem="handleRemoveItem"
    @updateQuantity="handleUpdateQuantity"
  />
</template>
