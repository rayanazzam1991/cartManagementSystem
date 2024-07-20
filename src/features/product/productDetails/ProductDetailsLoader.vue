<template>
  <div class="product-item-detail">
    <div class="product-item-main">
      <div class="h-[420px] relative flex items-center justify-center overflow-hidden basis-full md:basis-[calc(50%_-_1rem)]">
        <div class="shimmerBG media"></div>
      </div>
      <div class="product-item-detail-content-wrapper basis-full md:basis-[calc(50%_-_1rem)]">
        <div class="shimmerBG product-item-title title-line"></div>
        <div class="shimmerBG product-item-description content-line mt-16"></div>
        <div class="shimmerBG product-item-title title-line end mt-12"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-item-detail {
  max-width: 100%;
}

.product-item-detail .shimmerBG {
  width: 100%;
  height: 100%;
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

.product-item-detail .media {
  height: 450px;
  width: 100%;
}

.product-item-detail .title-line {
  height: 24px;
  width: 100%;
  margin-bottom: 12px;
}

.product-item-detail .content-line {
  height: 120px;
  width: 100%;
  margin-bottom: 16px;
}

.product-item-detail .end {
  width: 40%;
}

.m-t-24 {
  margin-top: 24px;
}

</style>