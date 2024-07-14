<script setup lang="ts">
import type { Product } from '@/products'
import { EyeIcon, StarIcon, ShoppingBagIcon } from '@heroicons/vue/24/solid'
import { truncateString } from '@/util/stringHelper'
import { useProductItem } from '@/features/product/productList/useProductList'

const props = defineProps<{
  product: Product,
  index?: number
}>()

const { showDetails, addToCart } = useProductItem()
</script>

<template>

  <div class="product-item group">
    <div class="product-item-image-wrapper">
      <img
        v-if="product.image"
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
        <div class="product-item-category-wrapper">
          <span
            class="product-item-category-tag"
          >{{ product.category }}</span
          >
        </div>
      </div>
      <div class="product-item-description-wrapper">
        <p class="product-item-description">{{ truncateString(product.description) }}</p>
      </div>

      <div class="product-item-bottom-wrapper">
        <div class="product-item-price-wrapper">
          <p class="product-item-price">{{ product.price }}$</p>
        </div>
        <div class="product-item-rating-wrapper">
          <div class="product-item-star-icon-wrapper">
            <span
              v-for="star in 5"
              :key="star"
              class="product-item-star-icon-button"
              :class="[
              product.rating && star <= (product.rating.rate) ? 'rated-star' : 'not-rated-star',
            ]"
            >
              <StarIcon class="product-item-star-icon" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="group-hover:flex shrink-0 items-center justify-center space-x-2"
    >
      <div class="product-item-actions-list-wrapper">
        <button class="product-item-action-cart-button" @click="addToCart(props.product?.id)">
          <ShoppingBagIcon />
        </button>
        <button
          class="product-item-action-show-button"
          @click="showDetails(props.product?.id,props.product.title)"
        >
          <EyeIcon />
        </button>
      </div>
    </div>
  </div>
</template>
