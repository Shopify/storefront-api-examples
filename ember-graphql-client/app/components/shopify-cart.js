import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  tagName: '',

  cartService: inject.service('cart'),

  cart: computed.alias('cartService.checkout'),

  checkoutDisabled: computed('cart.lineItems.[]', {
    get() {
      return this.get('cart.lineItems.length') < 1;
    }
  }),

  actions: {
    removeItem(lineItemId) {
      this.get('cartService').removeLineItem(lineItemId);
    },
    decrementQuantity(lineItemId, currentQuantity) {
      this.get('cartService').updateLineItem(lineItemId, currentQuantity - 1);
    },
    incrementQuantity(lineItemId, currentQuantity) {
      this.get('cartService').updateLineItem(lineItemId, currentQuantity + 1);
    },
    openCheckout() {
      window.open(this.get('cart.webUrl'));
    },
    close() {
      this.sendAction('close');
    }
  }
});
