<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import NumberInput from '@/components/element/NumberInput.vue'
import type { CartItem } from '@/features/cart/cart'
import CartLoader from '@/features/cart/components/CartDetailsLoader.vue'
import { useCartDetails } from '@/features/cart/useCartHooks'

const props = defineProps<{
  cartItems: CartItem[]
  productsLoading: boolean
}>()
const emit = defineEmits<{
  (e: 'removeItem', itemId: number, quantity: number): void
  (e: 'updateQuantity', itemId: number, count: number): void
}>()

const {
  subtotal,
  total,
  removeItemFromCart,
  updateItemQuantity,
  applyCoupon,
  shippingFeesAmount,
  taxesAmount,
  couponNumber
} = useCartDetails(props, emit)
</script>

<template>
  <div class="cart-no-items" v-if="props.cartItems.length == 0">
    <span>No Items</span>
    <router-link class="btn btn-primary" :to="{path:'/'}">Go to Shop</router-link>
  </div>
  <div v-else>
    <div class="cart-page-title">Cart items</div>
    <CartLoader v-if="props.productsLoading" />
    <div v-else class="cart-wrapper">
      <div class="cart-items">
        <TransitionGroup name="cart-items" tag="div">
          <div class="cart-item-card"
               v-for="(item) in props.cartItems"
               :key="item.id"
          >
            <div class="cart-item-image">
              <img :src="item.image" :alt="item.title" width="128" />
            </div>
            <div class="cart-item-details">
              <div class="cart-item-detail-left">
                <div class="cart-item-detail-title">{{ item.title }}</div>
                <div class="cart-item-detail-unit-price">{{ item.unitPrice }}$</div>
                <div class="cart-item-detail-qty">
                  <NumberInput :model-value="item.quantity"
                               @update:modelValue="(count:number)=>updateItemQuantity(item.id,count)" />
                </div>
              </div>
              <div class="cart-item-detail-right">
                <div class="cart-item-detail-total-price">Total: {{ Number(item.totalPrice).toFixed(2) }}$</div>
                <div class="cart-item-remove-icon-wrapper">
                  <TrashIcon class="cart-item-remove-icon" @click.prevent="removeItemFromCart(item.id,item.quantity)" />
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
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
              <span class="cart-summary-item-value">{{ shippingFeesAmount }}$</span>
            </div>
            <div class="cart-summary-item">
              <span class="cart-summary-item-label">Taxes</span>
              <span class="cart-summary-item-value">{{ taxesAmount }}%</span>
            </div>
            <div class="separator"></div>
            <div class="cart-summary-item">
              <div class="cart-summary-coupon-label">
                Do you have coupon?
              </div>
            </div>
            <div class="cart-summary-item">
              <div class="cart-summary-coupon-input-wrapper">
                <input class="cart-summary-coupon-input" type="text" v-model="couponNumber">
                <div class="cart-summary-coupon-apply-wrapper">
                  <div class="cart-summary-coupon-apply-button">
                    <button @click.prevent="applyCoupon" class="btn btn-secondary hover:text-amber-50"> Apply Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="cart-summary-total">
            <div class="cart-summary-total-item">
              <span class="cart-summary-total-label">Total amount</span>
              <span class="cart-summary-total-value">{{ total }}$</span>
            </div>
            <div class="cart-summary-checkout-button">
              <button class="btn btn-primary">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cart-items-enter-active,
.cart-items-leave-active {
  transition: all 0.5s ease;
}

.cart-items-enter-from,
.cart-items-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>