<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/products'
/*
These are Icons that you can use, of course you can use other ones if you prefer.
*/
import { EyeIcon, StarIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/vue/24/solid'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  product: Product,
  index?: number
}>()

const emit = defineEmits(['edit', 'remove', 'update:rating'])

const notRated = computed(() => {
  return Boolean(!props.product?.rating.rate)
})

function updateRating(rating: number) {
  emit('update:rating', props.product.id, rating)
}

function removeMovie() {
  emit('remove', props.product.id)
}

function editMovie() {
  emit('edit', props.product.id)
}

const cartStore = useCartStore()
const addToCart = (item: Product) => {
  cartStore.addToCart(item, 1)
}
</script>

<template>
  <div class="product-item group">
    <div class="product-item-image-wrapper">
      <div class="product-item-star-wrapper">
        <StarIcon
          id="rating"
          class="product-item-star-rating-icon"
          :class="{
            'text-yellow-500': !notRated,
            'text-gray-500': notRated,
          }"
        />
        <div class="product-item-star-content-wrapper">
          <span
            v-if="!notRated"
            id="rating-stars"
            class="product-item-star-content-rating-rated"
          >
            {{ product.rating.rate }}
          </span>
          <span v-else class="product-item-star-content-rating-not-rated">
            -
          </span>
        </div>
      </div>
      <img
        v-if="product?.image"
        :src="product.image"
        class="product-item-image"
        :alt="product.title"
      />
      <span v-else class="product-item-no-image">
        <span class="text-white text-4xl">No image</span>
      </span>
    </div>
    <div class="product-item-content-wrapper">
      <div class="product-item-title-wrapper">
        <h3 class="product-item-title">{{ product.title }}</h3>
        <div class="product-item-genres-wrapper">
          <span
            class="product-item-genre-tag"
          >{{ product.category }}</span
          >
        </div>
      </div>
      <div class="product-item-description-wrapper">
        <p class="product-item-description">{{ product.description }}</p>
      </div>
      <div class="product-item-rating-wrapper">
        <span class="product-item-rating-text">
          Rating: ({{ product.rating.rate }}/5)
        </span>
        <div class="product-item-star-icon-wrapper">
          <button
            v-for="star in 5"
            :key="star"
            class="product-item-star-icon-button"
            :class="[
              star <= product.rating.rate ? 'text-yellow-500' : 'text-gray-500',
            ]"
            :disabled="star === product.rating.rate"
            @click="updateRating(star)"
          >
            <StarIcon class="product-item-star-icon" />
          </button>
        </div>
      </div>
    </div>
    <div
      class="group-hover:flex shrink-0 items-center justify-center space-x-2"
    >
      <div class="product-item-actions-list-wrapper">
        <button class="product-item-action-cart-button" @click="addToCart(props.product)">
          <ShoppingBagIcon class="w-4 h-4" />
        </button>
        <button
          class="product-item-action-show-button"
          @click="removeMovie()"
        >
          <EyeIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
