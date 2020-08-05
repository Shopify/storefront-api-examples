<template>
  <div
    class="Product"
    v-if="product">
      <img :src="product.images[0].src" alt="" />
      <h5 class="Product__title">{{ product.title }}</h5>
      <span className="Product__price">$50.00</span>
      <!--
      <p>{{ product.id }}</p>
      <p>{{ product.description }}</p>
      -->
      <button className="Product__buy button">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default ({

  props: {
    id: String,
  },

  setup(props) {
    const store = useStore();

    const product = computed(() => store.getters['products/productById'](props.id));

    return {
      product,
    };
  },

});
</script>
