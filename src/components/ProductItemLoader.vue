<template>
  <div class="product-item">
    <div class="shimmerBG media"></div>
    <div class="product-item-content-wrapper">
      <div class="shimmerBG product-item-title title-line"></div>
      <div class="shimmerBG product-item-description content-line m-t-24"></div>
      <div class="shimmerBG product-item-title title-line end"></div>
    </div>

  </div>
</template>

<style scoped>
.product-item .shimmerBG {
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

.product-item .media {
  height: 300px;
}


.product-item .title-line {
  height: 24px;
  width: 100%;
  margin-bottom: 12px;
}

.product-item .content-line {
  height: 80px;
  width: 100%;
  margin-bottom: 16px;
}

.product-item .end {
  width: 40%;
}

.m-t-24 {
  margin-top: 24px;
}

</style>