import Ember from 'ember';

const { Component, inject, computed, get, observer } = Ember;

export default Component.extend({
  cart: inject.service(),

  isCartOpen: true,

  lineItems: computed.alias('cart.lineItems'),

  checkoutUrl: computed.alias('cart.checkoutUrl'),

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
      window.open(this.get('checkoutUrl'));
    },
    closeCart() {
      this.set('isCartOpen', false);
    },
    openCart() {
      this.set('isCartOpen', true);
    }
  }
});
