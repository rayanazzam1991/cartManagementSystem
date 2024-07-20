<script setup lang="ts">
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useCart } from '@/features/cart/useCart'

const { cartItems, productsLoading,discount, handleRemoveItem, handleUpdateQuantity,handleCoupon } = useCart()

</script>

<template>
  <PageLayout>
    <CartDetailsView
      :cartItems
      :discount
      :productsLoading
      @removeItem="handleRemoveItem"
      @updateQuantity="handleUpdateQuantity"
      @applyCoupon = handleCoupon
    />
  </PageLayout>

</template>
