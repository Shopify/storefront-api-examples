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
          className="Line-item__remove">
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

    const productTitle = computed(() => store.getters['products/productTitleById'](props.item.productId));
    const variantTitle = computed(() => store.getters['products/variantTitleByIds'](props.item.productId, props.item.variantId));
    const variantPrice = computed(() => store.getters['products/variantPriceByIds'](props.item.productId, props.item.variantId));
    const variantImage = computed(() => store.getters['products/variantImageByIds'](props.item.productId, props.item.variantId));

    function incrementLineItemQuantity() {
      // Tell the store to increment the quantity for this line item
      store.dispatch('cart/UpdateLineItemInCart', {
        productId: props.item.productId,
        variantId: props.item.variantId,
        quantity: props.item.quantity + 1,
      });
    }

    function decrementLineItemQuantity() {
      // Tell the store to decrement the quantity for this line item
      store.dispatch('cart/UpdateLineItemInCart', {
        productId: props.item.productId,
        variantId: props.item.variantId,
        quantity: props.item.quantity - 1,
      });
    }

    return {
      productTitle,
      variantTitle,
      variantPrice,
      variantImage,
      incrementLineItemQuantity,
      decrementLineItemQuantity,

    };
  },

};
</script>
