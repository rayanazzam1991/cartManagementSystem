<script setup lang="ts">
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useCart } from '@/features/cart/useCartHooks'

const { cartItems, productsLoading, handleRemoveItem, handleUpdateQuantity } = useCart()
</script>

<template>
  <PageLayout>
    <CartDetailsView
      :cartItems
      :productsLoading
      @removeItem="handleRemoveItem"
      @updateQuantity="handleUpdateQuantity"
    />
  </PageLayout>

</template>
