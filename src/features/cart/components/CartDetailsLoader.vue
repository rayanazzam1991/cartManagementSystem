<template>
  <div class="cart-wrapper">
    <div class="cart-items">
      <div class="cart-item-card"
           v-for="n in 3"
           :key="n"
      >
        <div class="shimmerBG media basis-1/2"></div>
        <div class="flex flex-col basis-1/2">
          <div class="shimmerBG product-item-title title-line"></div>
          <div class="shimmerBG product-item-title title-line"></div>
        </div>

        </div>
    </div>
    <div class="cart-summary">
      <div class="cart-summary-content">
        <div class="cart-summary-items">
          <div class="cart-summary-item">
            <div class="shimmerBG product-item-title title-line"></div>
          </div>

          <div class="cart-summary-item">
            <div class="shimmerBG product-item-title title-line"></div>
          </div>
        </div>
        <div class="cart-summary-total">
          <div class="cart-summary-total-item">
            <div class="shimmerBG product-item-title title-line"></div>
          </div>
          <div class="cart-summary-checkout-button">
            <div class="shimmerBG product-item-title title-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cart-wrapper .shimmerBG {
  animation-duration: 2.2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: #ddd;
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
  background-size: 1200px 100%;
}

@-webkit-keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@keyframes shimmer {
  0% {
    background-position: -1200px 0;
  }
  100% {
    background-position: 1200px 0;
  }
}

.cart-wrapper .media {
  height: 200px;
}


.cart-wrapper .title-line {
  height: 24px;
  width: 100%;
  margin-bottom: 12px;
}

.cart-wrapper .content-line {
  height: 80px;
  width: 100%;
  margin-bottom: 16px;
}

.cart-wrapper .end {
  width: 40%;
}

.m-t-24 {
  margin-top: 24px;
}

</style>
<script setup lang="ts">
</script>