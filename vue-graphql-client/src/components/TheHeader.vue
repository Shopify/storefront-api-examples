<template>
  <div>
     <header class="App__header">

      <ul class="App__nav">

        <li class="App__view-cart-wrapper">
          <button
            class="App__view-cart"
            v-on:click="toggleCartVisibility">Cart ({{ cartCount }})</button>
        </li>

      </ul>

      <div class="App__title">
        <h1>Shopify API: Vue.js 3 Example</h1>
        <h2>Description</h2>
      </div>

     </header>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

function useCartButton(context : any) {
  const store = useStore();

  const cartCount = computed(() => store.getters['cart/cartProductsCount']);

  function toggleCartVisibility() {
    // Tell the store to toggle the visibility of the cart
    store.dispatch('cart/ToggleCartVisibility');
  }

  return {
    cartCount,
    toggleCartVisibility,
  };
}

export default {
  setup(props : any, context : any) {
    const { cartCount, toggleCartVisibility } = useCartButton(context);
    return {
      cartCount,
      toggleCartVisibility,
    };
  },
};
</script>
