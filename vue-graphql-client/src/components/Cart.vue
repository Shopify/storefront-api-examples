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
        <product-list-card
          v-for="(item, index) in cartItems"
          :item="item"
          :index="index"
          :key="item.id"/>
      </ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {props.checkout.subtotalPrice}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Taxes</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {props.checkout.totalTax}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Total</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {props.checkout.totalPrice}</span>
          </div>
        </div>
        <button className="Cart__checkout button">Checkout</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import ProductListCard from '@/components/CartLineItem.vue';

export default {

  setup() {
    const store = useStore();
    const cartVisibility = computed(() => store.getters['cart/cartVisibility']);

    const cartItems = computed(() => store.getters['cart/cartItems']);

    function toggleCartVisibility() {
      // Tell the store to toggle the visibility of the cart
      store.dispatch('cart/ToggleCartVisibility');
    }

    return {
      cartVisibility,
      toggleCartVisibility,
      cartItems,
    };
  },

  components: {
    ProductListCard,
  },

};
</script>
