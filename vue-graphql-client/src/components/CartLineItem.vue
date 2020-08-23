<template>
  <li className="Line-item">
    <div className="Line-item__img">
      <img :src="variantImage" alt="{{ productTitle }} | {{ variantTitle }}"/>
    </div>
    <div className="Line-item__content">
      <div className="Line-item__content-row">
        <div className="Line-item__variant-title">
          {{ variantTitle }}
        </div>
        <span className="Line-item__title">
          {{ productTitle }}
        </span>
      </div>
      <div className="Line-item__content-row">
        <div className="Line-item__quantity-container">
          <button
            className="Line-item__quantity-update"
            v-on:click="decrementLineItemQuantity">-</button>
          <span className="Line-item__quantity">{{ item.quantity }}</span>
          <button
            className="Line-item__quantity-update"
            v-on:click="incrementLineItemQuantity">+</button>
        </div>
        <span className="Line-item__price">
          {{ variantPrice }}
        </span>
        <button
          className="Line-item__remove"
          v-on:click="removeLineItem">
          ×
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { LineItem } from '@/store/modules/cart.types';
// import { Product } from '@/store/modules/products.types';

export default {

  props: {
    item: Object,
  },

  setup(props : any) {
    const store = useStore();

    // Get the product title from the vuex store
    const productTitle = computed(() => store.getters['products/productTitleByVariantId'](props.item.variantId));
    // Get the variant title from the vuex store
    const variantTitle = computed(() => store.getters['products/variantTitleByVariantId'](props.item.variantId));
    // Get the variant price title from the vuex store
    const variantPrice = computed(() => store.getters['products/variantPriceByVariantId'](props.item.variantId));
    // Get the variant image src from the vuex store
    const variantImage = computed(() => store.getters['products/variantImgSrcByVariantId'](props.item.variantId));

    function removeLineItem() {
      store.dispatch('cart/removeLineItemFromCart', props.item.variantId);
    }

    function incrementLineItemQuantity() {
      // Tell the store to increment the quantity for this line item
      store.dispatch('cart/updateLineItemQuantityInCart', {
        variantId: props.item.variantId,
        quantityChange: 1,
      });
    }

    function decrementLineItemQuantity() {
      // Tell the store to decrement the quantity for this line item
      store.dispatch('cart/updateLineItemQuantityInCart', {
        variantId: props.item.variantId,
        quantityChange: -1,
      });
    }

    return {
      productTitle,
      variantTitle,
      variantPrice,
      variantImage,
      removeLineItem,
      incrementLineItemQuantity,
      decrementLineItemQuantity,
    };
  },

};
</script>
