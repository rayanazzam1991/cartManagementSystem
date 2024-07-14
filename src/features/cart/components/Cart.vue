<script setup lang="ts">
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useCartManagement } from '@/features/cart/useCartManagement'

const { items, productsLoading, handleRemoveItem, handleUpdateQuantity } = useCartManagement()
</script>

<template>
  <PageLayout>
    <CartDetailsView
      :items
      :productsLoading
      @removeItem="handleRemoveItem"
      @updateQuantity="handleUpdateQuantity"
    />
  </PageLayout>

</template>
