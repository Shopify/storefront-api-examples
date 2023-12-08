<template>
  <div>
    <the-header />
    <product-list />
    <cart />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'App',

  setup() {
    // Flag to manage the open or closed state of the cart
    // Default is set to closed
    const cartVisibility = ref(false);

    // The cart button was clicked so open (or close) the cart component
    function toggleCartVisibility() {
      console.info('Toggle Cart Visibility Clicked');
      cartVisibility.value = !cartVisibility.value;
    }

    return {
      cartVisibility,
      toggleCartVisibility,
    };
  },

  components: {
    Cart,
    TheHeader,
    ProductList,
  },
};
</script>

<style>
</style>
