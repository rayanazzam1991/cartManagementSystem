import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ProductList from '@/features/product/productList/ProductList.vue'
import ProductsListView from '@/features/product/productList/ProductsListView.vue'
import * as ProductListComposable from '@/features/product/productList/useProductList'
import type { Product } from '@/products'
import { computed, ref } from 'vue'

const mockedProductList: Product[] = [
  {
    'id': 1,
    'title': 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    'price': 109.95,
    'description': 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    'category': 'men\'s clothing',
    'image': 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'rating': {
      'rate': 3.9,
      'count': 120
    }
  },
  {
    'id': 2,
    'title': 'Mens Casual Premium Slim Fit T-Shirts ',
    'price': 22.3,
    'description': 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    'category': 'men\'s clothing',
    'image': 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    'rating': {
      'rate': 4.1,
      'count': 259
    }
  }
]
const mockedProductListComputed = computed(() => {
  return mockedProductList
})
const mockedLoading = ref<boolean>(true)
vi.spyOn(ProductListComposable, 'useProductList').mockReturnValue({
  productsList: mockedProductListComputed,
  productsLoading: mockedLoading
})

describe('ProductList Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof ProductList>>

  beforeEach(() => {
    wrapper = mount(ProductList)
  })

  it('Should render productList component without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('Should have ProductsListView with productsList, productsLoading props', () => {
    const productsListViewComp = wrapper.findComponent(ProductsListView)
    expect(productsListViewComp.exists()).toBe(true)

    expect(productsListViewComp.props().productsList).toBe(ProductListComposable.useProductList().productsList.value)
    expect(productsListViewComp.props().productsLoading).toBe(ProductListComposable.useProductList().productsLoading.value)
  })
})