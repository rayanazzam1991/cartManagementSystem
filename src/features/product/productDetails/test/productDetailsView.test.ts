import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductDetailsView from '@/features/product/productDetails/ProductDetailsView.vue'

// Mock the NumberInput component
vi.mock('@/components/element/NumberInput.vue', () => ({
  default: {
    template: '<input type="number" />'
  }
}))

describe('ProductItemDetail.vue', () => {
  let productSample: any
  let mockEmit: any

  beforeEach(() => {
    productSample = {
      id: 1,
      title: 'Sample Product',
      category: 'Category A',
      price: 100,
      description: 'This is a sample product description.',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.5, count: 10 }
    }

    mockEmit = vi.fn()
  })

  it('renders without crashing', () => {
    const wrapper = mount(ProductDetailsView, {
      props: {
        product: productSample
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays "Product Not Found" when product is null', () => {
    const wrapper = mount(ProductDetailsView, {
      props: {
        product: null
      }
    })

    expect(wrapper.text()).toContain('Product Not Found')
    expect(wrapper.find('router-link').exists()).toBe(true)
  })

  it('displays product details when product is provided', () => {
    const wrapper = mount(ProductDetailsView, {
      props: {
        product: productSample
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(productSample.image)
    expect(img.attributes('alt')).toBe(productSample.title)

    expect(wrapper.find('.product-item-title').text()).toBe(productSample.title)
    expect(wrapper.find('.product-item-category-tag').text()).toBe(productSample.category)
    expect(wrapper.find('.product-item-detail-price').text()).toBe(`${productSample.price} $`)
    expect(wrapper.find('.product-item-description').text()).toBe(productSample.description)

    const stars = wrapper.findAll('.product-item-star-icon-button')
    expect(stars.length).toBe(5)
  })

  it('correctly reflects the rating with star icons', () => {
    const wrapper = mount(ProductDetailsView, {
      props: {
        product: productSample
      }
    })

  })

  it('emits "addToCart" with correct arguments when button is clicked', async () => {
    const wrapper = mount(ProductDetailsView, {
      props: {
        product: productSample
      },
    })

    const button = wrapper.find('.btn-primary')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('addToCart')
    expect(wrapper.emitted().addToCart).toHaveLength(1)
    expect(wrapper.emitted().addToCart[0]).toEqual([productSample.id, 1])
  })
})