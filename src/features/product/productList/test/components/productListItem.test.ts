import { describe, expect, it ,test} from 'vitest'
import { mount } from '@vue/test-utils'
import ProductListItem from '@/features/product/productList/ProductListItem.vue'
import type { Product } from '@/products'
import { truncateString } from '@/util/stringHelper'

const productItemSample: Product =
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
  }
describe('ProductListItem  Component', () => {

  it('Should render productListItem component without crashing with required props', () => {
    const wrapper = mount(ProductListItem, {
      props: {
        product: productItemSample
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
  it('should renders product details correctly', () => {
    const wrapper = mount(ProductListItem, {
      props: {
        product:productItemSample,
      },
    })

    // Check for image
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(productItemSample.image)
    expect(img.attributes('alt')).toBe(productItemSample.title)

    // Check for title
    const title = wrapper.find('.product-item-title')
    expect(title.text()).toBe(productItemSample.title)

    // Check for category
    const category = wrapper.find('.product-item-category-tag')
    expect(category.text()).toBe(productItemSample.category)

    // Check for description
    const description = wrapper.find('.product-item-description')
    expect(description.text()).toBe(truncateString(productItemSample.description))

    // Check for price
    const price = wrapper.find('.product-item-price')
    expect(price.text()).toBe(`${productItemSample.price}$`)

    // Check for rating
    const stars = wrapper.findAll('.product-item-star-icon-button')
    expect(stars).toHaveLength(5)
  })
  it('should renders fallback for missing image', () => {
    const wrapper = mount(ProductListItem, {
      props: {
        product: { ...productItemSample, image: undefined },
      },
    })

    const noImageSpan = wrapper.find('.product-item-no-image')
    expect(noImageSpan.exists()).toBe(true)
    expect(noImageSpan.text()).toBe('No image')
  })

})