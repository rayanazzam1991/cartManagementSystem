import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/features/product/productList/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/features/cart/components/Cart.vue')
    },
    {
      path: '/product/:id/:slug',
      name: 'product.details',
      component: () => import('@/features/product/productDetails/ProductDetails.vue')
    }
  ]
})

export default router
