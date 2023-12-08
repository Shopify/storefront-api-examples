<template>
  <div
    class="Product"
    v-if="product">
    <img :src="productImage" alt="" />
    <h5 class="Product__title">{{ product.title }}</h5>
    <span className="Product__price">{{ productVariantPrice }}</span>
    <select
      className="Product__option"
      v-model="orderVariantId">
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
        v-model="orderQuantity"
        v-on:change="handleProductQuantityChanged"
        type="number" />
    </label>
    <button
      v-bind:disabled="hasError"
      v-on:click="handleAddVariantToCart"
      className="Product__buy button">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { LineItem } from '@/store/modules/cart.types';
import { Product, ProductVariant } from '@/store/modules/products.types';

export default ({

  props: {
    productKey: {
      type: String,
      required: true,
    },
  },

  setup(props : any) {
    const DEFAULT_ORDER_QUANTITY = 1;

    const store = useStore();
    const product = computed(() => store.getters['products/productById'](props.productKey));
    const hasError = ref(false);
    const orderQuantity = ref(DEFAULT_ORDER_QUANTITY);
    const orderVariantId = ref('');

    const productImage = computed(() => {
      const productImageSrc = product.value.images[0];
      let variantImageSrc = null;
      if (orderVariantId.value !== '') {
        variantImageSrc = product.value.variants
          .find((item : ProductVariant) => item.id === orderVariantId.value).imageSrc;
      }
      return variantImageSrc || productImageSrc;
    });

    const productVariantPrice = computed(() => {
      let price = '';
      if (orderVariantId.value !== '') {
        const index = product.value.variants.findIndex(
          (element: ProductVariant) => element.id === orderVariantId.value,
        );
        price = `$${parseFloat(product.value.variants[index].price).toFixed(2)}`;
      }
      return price;
    });

    watch(product, () => {
      if (product.value.variants) {
        orderVariantId.value = product.value.variants
          .find((item : ProductVariant) => item !== undefined).id;
      }
    }, { immediate: true });

    function handleProductQuantityChanged() {
      hasError.value = orderQuantity.value.toString() === '';
    }

    function handleAddVariantToCart() {
      const payload = {
        variantId: orderVariantId.value,
        quantity: orderQuantity.value,
      };
      store.dispatch('cart/addLineItemToCart', payload);
    }

    return {
      product,
      hasError,
      orderQuantity,
      orderVariantId,
      productImage,
      productVariantPrice,
      handleAddVariantToCart,
      handleProductQuantityChanged,
    };
  },

});
</script>
