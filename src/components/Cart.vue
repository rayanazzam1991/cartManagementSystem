<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import NumberInput from '@/components/basic/NumberInput.vue'
import type { CartItem } from '@/stores/cart'

const props = defineProps<{
  items: CartItem[]
}>()
const emit = defineEmits<{
  (e: 'removeItem', itemId: number, quantity: number): void
}>()

const shippingFeesAmount = 40

const subtotal = computed(() => {
  return Number(props.items.reduce((acc: number, item: CartItem) => {
    return acc + item.totalPrice
  }, 0)).toFixed(2)
})
const total = computed(() => {
  return Number(subtotal.value + shippingFeesAmount).toFixed(2)
})
const removeItemFromCart = (itemId: number, quantity: number) => {
  emit('removeItem', itemId, quantity)
}
</script>

<template>
  <div class="cart-page-title">Cart items</div>
  <div class="cart-wrapper">
    <div class="cart-items">
      <div class="cart-item-card"
           v-for="(item,index) in props.items"
      >
        <div class="cart-item-image">
          <img :src="item.image" :alt="item.title" width="128" />
        </div>
        <div class="cart-item-details">
          <div class="cart-item-detail-left">
            <div class="cart-item-detail-title">{{ item.title }}</div>
            <div class="cart-item-detail-unit-price">{{ item.unitPrice }}$</div>
            <div class="cart-item-detail-qty">
              <NumberInput :value="item.quantity" />
            </div>
          </div>
          <div class="cart-item-detail-right">
            <div class="cart-item-detail-total-price">Total: {{ item.totalPrice }}$</div>
            <TrashIcon class="cart-item-remove-icon" @click.prevent="removeItemFromCart(item.id,item.quantity)" />
          </div>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <div class="cart-summary-title">Order Summary</div>
      <div class="cart-summary-content">
        <div class="cart-summary-items">
          <div class="cart-summary-item">
            <span class="cart-summary-item-label">Subtotal</span>
            <span class="cart-summary-item-value">{{ subtotal }}$</span>
          </div>

          <div class="cart-summary-item">
            <span class="cart-summary-item-label">Shipping Fees</span>
            <span class="cart-summary-item-value">40$</span>
          </div>
        </div>
        <div class="cart-summary-total">
          <div class="cart-summary-total-item">
            <span class="cart-summary-total-label">Total amount</span>
            <span class="cart-summary-total-value">{{ total }}$</span>
          </div>
          <div class="cart-summary-checkout-button">
            <button class="button button-primary">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>