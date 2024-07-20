<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', count: number): void
  (e: 'increment' | 'decrement'): void
}>()

const count = toRef(props.modelValue)
const incrementValue = () => {
  count.value++
  emit('update:modelValue', count.value)
}
const decrementValue = () => {
  count.value--
  if (count.value > 0)
    emit('update:modelValue', count.value)
  else count.value = 1
}
</script>

<template>
  <div class="number-input-wrapper" data-hs-input-number="">
    <div class="number-input-inner">
      <button type="button" class="number-input-decrement-button" data-hs-input-number-decrement=""
              @click.prevent="decrementValue()">
        <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M5 12h14"></path>
        </svg>
      </button>
      <input class="number-input-value" type="text"
             v-model="count"
             data-hs-input-number-input="">
      <button type="button" class="number-input-increment-button" data-hs-input-number-increment=""
              @click.prevent="incrementValue()">
        <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      </button>
    </div>
  </div>
</template>