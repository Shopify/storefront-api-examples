<template>
  <div>
    <the-header />
    <product-list />
  </div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue';
import ProductList from './components/ProductList.vue';

export default ({
  name: 'App',
  components: {
    TheHeader,
    ProductList,
  },
});
</script>

<style>
</style>
