<template>
  <div id="app" v-bind:class="{ 'scroll-disabled': scrollDisabled, 'click-disabled': loading }">
    <ProductList v-on:reveal-loader="onRevealLoader" v-on:hide-loader="onHideLoader" v-on:reveal-product-details="onRevealProductDetails" v-if="checkoutId" :checkoutId="checkoutId"/>
    <transition name="fade">
      <ProductDetail v-on:hide-product-details="onHideProductDetails" v-on:cart-updated="onCartUpdate" v-if="product" :product="product" :checkoutId="checkoutId"/>
    </transition>
    <CartButton :count="cartCount" v-on:reveal-cart="onRevealCart"></CartButton>
    <transition name="fade">
      <Cart v-on:hide-cart="onHideCart" :checkout-url="checkoutUrl" :total-price="totalPrice" v-if="showCart" v-on:remove-from-cart="onRemoveFromCart" v-on:update-quantity="onUpdateQuantity" :lineItems="cartLineItems" :checkoutId="checkoutId"/>
    </transition>
    <transition name="fade"><double-bounce v-if="loading" :background="loadingColor"></double-bounce></transition>
  </div>
</template>

<script>

import { DoubleBounce } from 'vue-loading-spinner'

import config from '../config.js';

import ShopifyClient from './services/ShopifyClient'
import ProductList from './components/ProductList/ProductList.vue'
import ProductDetail from './components/ProductDetail/ProductDetail.vue'
import CartButton from './components/CartButton/CartButton.vue'
import Cart from './components/Cart/Cart.vue'

export default {
  name: 'app',
  components: {
    DoubleBounce,
    ProductList,
    ProductDetail,
    CartButton,
    Cart
  },
  data() {
    return {
      checkoutId: null,
      product: null,
      cartLineItems: null,
      showCart: false,
      cartCount: 0,
      totalPrice: null,
      scrollDisabled: false,
      loading: false,
      loadingColor: config.loadingColor,
      checkoutUrl: null
    }
  },
  methods: {
    onRevealProductDetails(product) {
      this.product = product
      this.scrollDisabled = true
      if(config.googleAnalyticsId){
        this.$ga.page('/product/' + product.id)
      }
    },
    onHideProductDetails() {
      this.product = null
      this.scrollDisabled = false
      if(config.googleAnalyticsId){
        this.$ga.page('/')
      }
    },
    onRevealCart() {
      this.showCart = true
      this.scrollDisabled = true
      if(config.googleAnalyticsId){
        this.$ga.page('/cart')
      }
    },
    onHideCart(){
      this.showCart = false
      this.scrollDisabled = false
      if(config.googleAnalyticsId){
        this.$ga.page('/')
      }
    },
    onRevealLoader() {
      this.loading = true
    },
    onHideLoader() {
      this.loading = false
    },
    onCartUpdate() {
      this.getCart()
    },
    onRemoveFromCart(lineItemId) {
      this.loading = true
      this.shopifyClient.removeFromCart(lineItemId, this.checkoutId, success => {
        console.log(success)
        this.loading = false
        this.getCart()
      }, error => {
        console.log("onRemoveFromCart Error", error)
      })
    },
    onUpdateQuantity(lineItemId, variantId, quantity) {
      this.loading = true
      this.shopifyClient.updateQuantity(lineItemId, variantId, quantity, this.checkoutId, success => {
        console.log(success)
        this.loading = false
        this.getCart()
      }, error => {
        console.log("onRemoveFromCart Error", error)
      })
    },
    getCart() {
      this.loading = true
      this.shopifyClient.getCart(this.checkoutId, cart => {
        this.cartCount = cart.count
        this.cartLineItems = cart.lineItems
        this.loading = false

        if(this.cartCount < 1) {
          this.showCart = false
        }

        this.checkoutUrl = cart.checkoutUrl
        this.totalPrice = cart.totalPrice

        
      }, error => {
        console.log("getCart Error", error);
      })
    },
  },
  mounted(){
    this.shopifyClient = new ShopifyClient(config.shopifyDomain, config.shopifyToken);
    this.checkoutId = localStorage.getItem(config.localStorageKey);
    if(!this.checkoutId) {
      
      this.shopifyClient.createCheckoutId(checkoutId => {
        this.checkoutId = checkoutId
        localStorage.setItem(config.localStorageKey, this.checkoutId);
        this.getCart()
      }, errorResponse => {
          console.log("Could not create checkoutId", errorResponse)
      })
    } else {
      this.getCart()
    }
    if(config.googleAnalyticsId){
      this.$ga.page('/')
    }
  }
}
</script>

<style lang="scss" src="./assets/scss/styles.scss"></style>
