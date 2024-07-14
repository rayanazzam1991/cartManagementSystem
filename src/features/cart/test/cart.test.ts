// CartComponent.spec.ts

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, assert } from 'vitest'
import * as useCartManagementComposable from '@/features/cart/useCartManagement'
import { computed, ref } from 'vue'
import type { CartItem } from '@/features/cart/cart'
import Cart from '@/features/cart/components/Cart.vue'
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import { useCartManagement } from '@/features/cart/useCartManagement'


const mockedItems = computed(() => {
  return [
    { id: 1, title: 'Product A', image: 'test1.jpg', quantity: 2, unitPrice: 100, totalPrice: 200 },
    { id: 2, title: 'Product B', image: 'test2.jpg', quantity: 2, unitPrice: 150, totalPrice: 300 }
  ]
})
const mockedLoading = ref(true)

// Mock the composable functions
vi.mock('@/features/cart/useCartManagement', () => ({
  useCartManagement: () => ({
    items: [
      { id: 1, title: 'Product A', image: 'test1.jpg', quantity: 2, unitPrice: 100, totalPrice: 200 },
      { id: 2, title: 'Product B', image: 'test2.jpg', quantity: 2, unitPrice: 150, totalPrice: 300 }
    ],
    productsLoading: mockedLoading.value,
    handleRemoveItem: vi.fn(),
    handleUpdateQuantity: vi.fn()
  })
}))

describe('CartComponent', () => {

  it('renders without crashing', () => {
    const wrapper = mount(Cart)
    expect(wrapper.exists()).toBe(true)
  })

  it('passes correct props to CartDetailsView', () => {
    const wrapper = mount(Cart)

    const cartDetailsView = wrapper.findComponent(CartDetailsView)
    expect(cartDetailsView.exists()).toBe(true)
    expect(cartDetailsView.props('items')).toEqual(mockedItems.value)
    expect(cartDetailsView.props('productsLoading')).toBe(mockedLoading.value)
  })

})