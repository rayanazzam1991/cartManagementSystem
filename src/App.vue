<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
</script>

<template>
  <div class="app">
    <TopHeader/>
    <RouterView />
  </div>
</template>
