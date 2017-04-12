import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  cartService: inject.service('cart'),

  cart: computed.alias('cartService.checkout'),

  checkoutDisabled: computed('cart.lineItems.edges.[]', {
    get() {
      return this.get('cart.lineItems.edges.length') < 1;
    }
  }),

  actions: {
    removeItem(lineItemId) {
      this.get('cartService').removeLineItem(lineItemId);
    },
    openCheckout() {
      window.open(this.get('cart.webUrl'));
    },
    close() {
      this.sendAction('close');
    }
  }
});

