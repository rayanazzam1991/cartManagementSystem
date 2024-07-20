import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductsListView from '@/features/product/productList/ProductsListView.vue'
import type { Product } from '@/products'
import ProductItemLoader from '@/features/product/productList/ProductItemLoader.vue'
import ProductListItem from '@/features/product/productList/ProductListItem.vue'

const ProductListSample: Product[] = [
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
describe('ProductListView  Component', () => {

  it('Should render productListView component without crashing', () => {
    const wrapper = mount(ProductsListView)
    expect(wrapper.exists()).toBe(true)
  })

  it('Should renders ProductItemLoader when productsLoading is true', () => {
    const wrapper = mount(ProductsListView, {
      props: {
        productsList: null,
        productsLoading: true
      }
    })
    const loader = wrapper.findAllComponents(ProductItemLoader)
    expect(loader).toHaveLength(6)
    expect(loader.at(0)?.exists()).toBe(true)
    expect(loader.at(0)?.isVisible()).toBe(true)
  })

  it('renders ProductListItem for each item in productsList', () => {
    const wrapper = mount(ProductsListView, {
      props: {
        productsList: ProductListSample,
        productsLoading: false
      }
    })
    const items = wrapper.findAllComponents(ProductListItem)
    expect(items).toHaveLength(ProductListSample.length)
    expect(items.at(0)?.exists()).toBe(true)
    expect(items.at(0)?.isVisible()).toBe(true)

    expect(items.at(0)?.props('product')).toEqual(ProductListSample[0])
    expect(items.at(1)?.props('product')).toEqual(ProductListSample[1])
  })

  it('Should not render ProductItemLoader when productsLoading is false',()=>{
    const wrapper = mount(ProductsListView, {
      props: {
        productsList: ProductListSample,
        productsLoading: false
      }
    })
    const loader = wrapper.findAllComponents(ProductItemLoader)
    expect(loader).toHaveLength(0)
  })
  it('Should renders correctly when productsList is empty',()=>{
    const wrapper = mount(ProductsListView, {
      props: {
        productsList: [],
        productsLoading: false
      }
    })

    // should not have loader
    const loader = wrapper.findAllComponents(ProductItemLoader)
    expect(loader).toHaveLength(0)

    // should not have items
    const items = wrapper.findAllComponents(ProductListItem)
    expect(items).toHaveLength(0)

  })

})