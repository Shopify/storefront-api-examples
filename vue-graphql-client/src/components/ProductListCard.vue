<template>
  <div
    class="Product"
    v-if="product">
      <img :src="product.images[0].src" alt="" />
      <h5 class="Product__title">{{ product.title }}</h5>
      <span className="Product__price">{{ productVariantPrice }}</span>
      <!--
      <p>{{ product.id }}</p>
      <p>{{ product.description }}</p>
      -->
      <select
        className="Product__option"
        v-model="variantSelected"
        v-on:change="handleVariantSelected">
        <option
          v-for="variant in product.variants"
          v-bind:key="variant.id"
          v-bind:value="variant.id">
          {{ variant.title }}
        </option>
      </select>
      <label className="Product__option">
        Quantity
        <input
          min="1"
          v-model="productQuantity"
          v-on:change="handleProductQuantityChanged"
          type="number" />
      </label>
      <button
        v-bind:disabled="formError"
        v-on:click="handleAddVariantToCart"
        className="Product__buy button">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { LineItem } from '@/store/modules/cart.types';
import { Product } from '@/store/modules/products.types';

export default ({

  props: {
    id: String,
  },

  setup(props) {
    const store = useStore();

    // Set the order quantity to a default of 1
    const formError = ref(false);

    const product : Product = computed(() => store.getters['products/productById'](props.id));

    // find the set the first available variant
    // TODO: if no variants available degrade gracefully
    const variantSelected = ref(product.value.variants[0].id);

    // Set the order quantity to a default of 1
    const productQuantity = ref(1);

    // Figure out the product image
    // Either it will be the main image
    // or if a variant is selected then its
    // the variant image if there is one
    // TO DO
    const productImage = computed(() => {
      const productImageSrc = product.value.images[0];
      if (variantSelected.value !== '') {
        console.log('nope');
      }
      return productImageSrc;
    });

    const productVariantPrice = computed(() => {
      let price = '';
      if (variantSelected.value !== '' || variantSelected.value !== undefined) {
        console.log('Calculating Variant Price');
        const index = product.value.variants.findIndex(
          (element) => element.id === variantSelected.value,
        );
        // Convert the string to a currency display
        price = `$${parseFloat(product.value.variants[index].price).toFixed(2)}`;
      }
      return price;
    });

    // Handle the user selecting a product variant
    function handleVariantSelected() {
      console.log('Variant Selected ID: ', variantSelected.value);
    }

    // Check to make sure the quantity requested is a valid number
    function handleProductQuantityChanged() {
      formError.value = productQuantity.value.toString() === '';
    }

    // Add variant to cart
    function handleAddVariantToCart() {
      // Create a line item object
      const lineItem: LineItem = {
        productId: product.value.id,
        variantId: variantSelected.value,
        quantity: productQuantity.value,
      };
      // Vuex store Add Product Variant to Cart function
      store.dispatch('cart/AddLineItemToCart', lineItem);
    }

    return {
      formError,
      product,
      productQuantity,
      productVariantPrice,
      variantSelected,
      handleVariantSelected,
      handleAddVariantToCart,
      handleProductQuantityChanged,
    };
  },

});
</script>
