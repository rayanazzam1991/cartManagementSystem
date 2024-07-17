import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useProductStore } from '@/features/product/product'


interface PurchasedItem {
  productId: number,
  quantity: number,
}

export interface CartContent {
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


const getCartFromLocalStorage = () => {
  if (localStorage.getItem('cart')) {
    return JSON.parse(localStorage.getItem('cart') as string ?? '')
  }
  return defaultCart
}

const defaultCart = {
  contents: {} as Record<number, PurchasedItem>
} satisfies CartContent

export const useCartStore = defineStore('cart', () => {
  const cartContent = ref<CartContent>(defaultCart)
  cartContent.value = getCartFromLocalStorage()


  function addToCart(itemId: number, count: number = 1) {
    const cartItem: PurchasedItem = {
      productId: itemId,
      quantity: count
    }
    if (cartContent.value.contents[itemId]) {
      cartContent.value.contents[itemId].quantity += count
    } else {
      cartContent.value.contents[itemId] = cartItem
    }

  }

  function removeFromCart(itemId: number, count: number) {
    if (itemId in cartContent.value.contents) {
      cartContent.value.contents[itemId].quantity -= count
      if (cartContent.value.contents[itemId].quantity <= 0) {
        delete cartContent.value.contents[itemId]
      }
    }
  }

  function updateQuantity(itemId: number, count: number) {
    if (itemId in cartContent.value.contents) {
      cartContent.value.contents[itemId].quantity = count
    }
  }

  const getCartCount = computed(() => {
    if(!cartContent.value.contents) return 0;
    return Object.keys(cartContent.value.contents).reduce((acc: number, id: string) => {
      return acc + cartContent.value?.contents[Number(id)]?.quantity
    }, 0)
  })

  function getCartContent() {
    const productStore = useProductStore()
    return  Object.keys(cartContent.value.contents).map((productId: string) => {
      const currentItem = cartContent.value.contents[Number(productId)]
      const productDetails = productStore.getProductById(Number(currentItem.productId))
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
    getCartContent,
    updateQuantity
  }
})