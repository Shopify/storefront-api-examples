<template>
  <div>
    <main>
      <h1 class="sr-only">Product List</h1>
    </main>
    <div class="Product-wrapper">
      <product-list-card
        v-for="key in productsKeys"
        v-bind:key="key"
        :id="key" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import ProductListCard from '@/components/ProductListCard.vue';

export default ({

  setup() {
    const store = useStore();

    const products = computed(() => store.getters['products/productsAll']);

    const productsKeys = computed(() => store.getters['products/productsKeys']);

    const productsCount = computed(() => store.getters['products/productsCount']);

    // Tell the store to get all of the products
    store.dispatch('products/fetchAllProducts');

    return {
      products,
      productsCount,
      productsKeys,
    };
  },

  components: {
    ProductListCard,
  },

});
</script>

<style>
</style>
