import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ProductsView.vue'
import ProductsView from '../views/ProductsView.vue'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
  ]
})

export default router
