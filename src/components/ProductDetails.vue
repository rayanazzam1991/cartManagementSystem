<script setup lang="ts">
import type { Product } from '@/products'
import { StarIcon } from '@heroicons/vue/24/solid'
import {  ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import NumberInput from '@/components/basic/NumberInput.vue'

const { product } = defineProps<{
  product: Product | null
}>()


const cartStore = useCartStore()
const quantity = ref(1)
const addToCart = (itemId: number) => {
  cartStore.addToCart(itemId, quantity.value)
}

</script>

<template>
  <div v-if="!product"> No Product Found </div>
  <div v-else class="product-item-detail">
    <div class="product-item-detail-image-wrapper">
      <img
        v-if="product.image"
        :src="product.image"
        class="product-item-image"
        :alt="product.title"
      />
      <span v-else class="product-item-detail-no-image">
        <span class="text-white text-4xl">No image</span>
      </span>
    </div>
    <div class="product-item-detail-content-wrapper">
      <div class="product-item-detail-title-wrapper">
        <div class="product-item-category-wrapper">
          <span
            class="product-item-category-tag"
          >{{ product.category }}</span
          >
        </div>
        <h3 class="product-item-title">{{ product.title }}</h3>
        <div class="product-item-rating-wrapper">
          <div class="product-item-star-icon-wrapper">
            <button
              v-for="star in 5"
              :key="star"
              class="product-item-star-icon-button"
              :class="[
              star <= product.rating.rate ? 'rated-star' : 'not-rated-star',
            ]"
              :disabled="star === product.rating.rate"
            >
              <StarIcon class="product-item-star-icon" />
            </button>
          </div>
        </div>
      </div>
      <div class="product-item-detail-price-wrapper">
        <div class="product-item-detail-price">
          {{ product.price }} $
        </div>
      </div>
      <div class="product-item-detail-cart-wrapper">
        <div class="product-item-detail-quantity-wrapper">
          <div class="product-item-detail-quantity">
            <NumberInput :model-value="quantity" @update:modelValue="count => quantity = count" />
          </div>
          <button class="btn btn-primary" @click="addToCart(product.id)">Add to Cart</button>
        </div>
      </div>
    </div>
    <div class="product-item-extra">
      <div class="product-item-detail-description-wrapper">
        <h3 class="text-2xl">Description</h3>
        <p class="product-item-description">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>