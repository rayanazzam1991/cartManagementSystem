import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/products'
import { useProductStore } from '@/stores/product'
import { it } from 'vitest'


interface PurchasedItem {
  productId: number,
  quantity: number,
}

interface Cart {
  contents: Record<number, PurchasedItem>
}

export interface CartItem {
  id: number,
  quantity: number,
  title: string,
  unitPrice: number,
  totalPrice: number,
  image: string,
}

const defaultCart = {
  contents: {} as Record<number, PurchasedItem>
} satisfies Cart

export const useCartStore = defineStore('cart', () => {
  const cartContent = ref<Cart>(defaultCart)

  function addToCart(item: Product, count: number) {
    const cartItem: PurchasedItem = {
      productId: item.id,
      quantity: count
    }
    if (cartContent.value.contents[item.id]) {
      cartContent.value.contents[item.id].quantity += count
    } else {
      cartContent.value.contents[item.id] = cartItem
    }
  }

  function removeFromCart(item: Product, count: number) {
    if (item.id in cartContent.value.contents) {
      cartContent.value.contents[item.id].quantity -= count
      if (cartContent.value.contents[item.id].quantity <= 0) {
        delete cartContent.value.contents[item.id]
      }
    }
  }

  function getCartCount() {
    return Object.keys(cartContent.value.contents).reduce((acc: number, id: string) => {
      return acc + cartContent.value.contents[Number(id)].quantity
    }, 0)
  }

  function getCartContent() {
    const { getProductById } = useProductStore()
    return Object.keys(cartContent.value.contents).map((productId: string) => {
      const currentItem = cartContent.value.contents[Number(productId)]
      const productDetails = getProductById(Number(currentItem.productId))
      return {
        id: currentItem.productId,
        image: productDetails?.image,
        title: productDetails?.title,
        quantity: currentItem.quantity,
        unitPrice: Number(productDetails?.price),
        totalPrice: currentItem.quantity * Number(productDetails?.price)
      }
    }) as CartItem[]
  }

  return {
    cartContent,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartContent
  }
})