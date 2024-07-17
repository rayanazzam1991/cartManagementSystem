import {describe, expect, it} from 'vitest'
import { mount, shallowMount, type VueWrapper } from '@vue/test-utils'
import CartDetailsView from '@/features/cart/components/CartDetailsView.vue'
import { computed, ref } from 'vue'
import type { CartItem } from '@/features/cart/cartStore'
import NumberInput from '@/components/element/NumberInput.vue'
import CartDetailsLoader from '@/features/cart/components/CartDetailsLoader.vue'

const mockedCartItems = computed(() => {
  return [{
    id: 1,
    title: 'test',
    unitPrice: 10,
    totalPrice: 20,
    image: 'test.png',
    quantity: 2

  }, {
    id: 1,
    title: 'test',
    unitPrice: 10,
    totalPrice: 20,
    image: 'test.png',
    quantity: 2

  }] as CartItem[]
})
const mockedProductLoading = ref(false)


describe('CartDetailsView component', () => {

  let wrapper: VueWrapper<InstanceType<typeof CartDetailsView>>

  it('should renders correctly with required props', () => {

    wrapper = mount(CartDetailsView, {
      props: {
        cartItems: mockedCartItems.value,
        productsLoading: mockedProductLoading.value
      }
    })

    const cartDetailsViewComponent = wrapper.findComponent(CartDetailsView)
    expect(cartDetailsViewComponent.exists()).toBe(true)

    // should have props
    expect(cartDetailsViewComponent.props().cartItems).toEqual(mockedCartItems.value)
    expect(cartDetailsViewComponent.props().productsLoading).toEqual(mockedProductLoading.value)

  })

  it('renders "No Items" message when cart is empty', () => {
    const wrapper = shallowMount(CartDetailsView, {
      props: {
        cartItems: [],
        productsLoading: false
      }
    })
    expect(wrapper.text()).toContain('No Items')
  })

  it('renders CartLoader when products are loading', () => {
    const wrapper = shallowMount(CartDetailsView, {
      props: {
        cartItems: mockedCartItems.value,
        productsLoading: true
      }
    })
    expect(wrapper.findComponent(CartDetailsLoader).exists()).toBe(true)
  })

  it('renders cart items when cart is not empty and products are not loading', () => {
    const wrapper = shallowMount(CartDetailsView, {
      props: {
        cartItems: mockedCartItems.value,
        productsLoading: false
      }
    })
    expect(wrapper.findAll('.cart-item-card').length).toBe(mockedCartItems.value.length)
  })

  it('emits removeItem event when remove icon is clicked', async () => {
    const wrapper = mount(CartDetailsView, {
      props: {
        cartItems: mockedCartItems.value,
        productsLoading: false
      }
    })

    const deleteButtons = wrapper.findAll('.cart-item-remove-icon')
    expect(deleteButtons).toHaveLength(2)
    await deleteButtons[0].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('removeItem')

    expect(wrapper.emitted().removeItem[0]).toEqual([mockedCartItems.value[0].id, mockedCartItems.value[0].quantity])
  })

  it('updates item quantity when NumberInput value changes', async () => {
    const wrapper = mount(CartDetailsView, {
      props: {
        cartItems: mockedCartItems.value,
        productsLoading: false
      }
    })
    const numberInput = wrapper.findComponent(NumberInput)
    numberInput.vm.$emit('update:modelValue', 3)
    expect(wrapper.emitted().updateQuantity).toBeTruthy()
  })

  it('applies coupon when Apply Coupon button is clicked', async () => {
    const wrapper = shallowMount(CartDetailsView, {
      props: {
        cartItems: mockedCartItems.value,
        productsLoading: false
      }
    })
    const button = wrapper.find('.cart-summary-coupon-apply-button button')


    // get value of coupon Number
    const couponNumberInput = wrapper.find('.cart-summary-coupon-input')
    await couponNumberInput.setValue('1234')
    // @ts-ignore
    expect(couponNumberInput.element?.value).toBe('1234')

    await button.trigger('click')
    expect(wrapper.emitted().applyCoupon).toHaveLength(1)

    expect(wrapper.emitted().applyCoupon[0]).toEqual(['1234'])
  })

})