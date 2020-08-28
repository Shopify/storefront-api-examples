<template>
  <div>
    <div
      class="Cart"
      :class="{ 'Cart--open': cartVisibility }">
      <header className="Cart__header">
        <h2>Your cart</h2>
        <button
          v-on:click="toggleCartVisibility"
          className="Cart__close">
          ×
        </button>
      </header>
      <ul className="Cart__line-items">
        <cart-line-item
          v-for="(item, index) in cartItems"
          :item="item"
          :index="index"
          :key="item.id"/>
      </ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          <div className="Cart-info__pricing">
            <span className="pricing">${{ cartSubtotalPrice }}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Taxes</div>
          <div className="Cart-info__pricing">
            <span className="pricing">${{ cartTotalTax }}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Total</div>
          <div className="Cart-info__pricing">
            <span className="pricing">${{ cartTotalPrice }}</span>
          </div>
        </div>
        <button
          className="Cart__checkout button"
          v-on:disabled="cartWebUrl === ''"
          v-on:click="handleCartCheckOutClick">
          Checkout</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import CartLineItem from '@/components/CartLineItem.vue';

export default {

  setup() {
    const store = useStore();

    // Tell the store to get all of the products
    store.dispatch('cart/initialiseCart');

    // Get the needed cart info from the vuex store as reactive references
    const cartVisibility = computed(() => store.getters['cart/cartVisibility']);
    const cartItems = computed(() => store.getters['cart/cartItems']);
    const cartSubtotalPrice = computed(() => store.getters['cart/cartSubtotalPrice']);
    const cartTotalTax = computed(() => store.getters['cart/cartTotalTax']);
    const cartTotalPrice = computed(() => store.getters['cart/cartTotalPrice']);
    const cartWebUrl = computed(() => store.getters['cart/cartWebUrl']);

    function toggleCartVisibility() {
      // Tell the store to toggle the visibility of the cart
      store.dispatch('cart/ToggleCartVisibility');
    }

    function handleCartCheckOutClick() {
      window.location.href = cartWebUrl.value;
    }

    return {
      cartVisibility,
      cartSubtotalPrice,
      cartTotalTax,
      cartTotalPrice,
      cartItems,
      toggleCartVisibility,
      handleCartCheckOutClick,
    };
  },

  components: {
    CartLineItem,
  },

};
</script>
