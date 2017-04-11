import Ember from 'ember';

const { Component, inject, computed, get } = Ember;

export default Component.extend({
  cartService: inject.service('cart'),

  cart: computed.alias('cartService.checkout'),

  subtotalPrice: computed.alias('cart.checkout.subtotalPrice'),

  totalTax: computed.alias('cart.checkout.totalTax'),

  totalPrice: computed.alias('cart.checkout.totalPrice'),

  checkoutDisabled: computed('cart.lineItems.[]', {
    get() {
      return this.get('lineItems.length') < 1;
    }
  }),

  actions: {
    removeItem(item) {
      this.get('cart').removeLineItem(get(item, 'id'));
    },
    openCheckout() {
      window.open(this.get('cart.webUrl'));
    },
    close() {
      this.sendAction('close');
    }
  }
});
