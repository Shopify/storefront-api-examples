<template>
  <div>
    <main>
      <h3 class="sr-only">Product List</h3>
      <div class="Product-wrapper">
        <product-list-card
          v-for="productKey in productsKeys"
          v-bind:key="productKey"
          v-bind:productKey="productKey"
          />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import ProductListCard from '@/components/ProductListCard.vue';

export default ({

  setup() {
    const store = useStore();

    const productsKeys = computed(() => store.getters['products/productsKeys']);

    store.dispatch('products/fetchAllProducts');

    return {
      productsKeys,
    };
  },

  components: {
    ProductListCard,
  },

});
</script>
