import Ember from 'ember';

const { Service, inject } = Ember;

export default Service.extend({
  client: inject.service('js-buy-sdk-client'),
  checkout: null,

  init() {
    return this.get('client').createCheckout({allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}}).then(checkout => {
      this.set('checkout', checkout);
    });
  },

  addVariants({variantId, quantity}) {
    return this.get('client').addLineItems(this.get('checkout.id'), [{variantId, quantity}]).then(checkout => {
      this.set('checkout', checkout);
    });
  },

  updateLineItem(id, quantity) {
    return this.get('client').updateLineItems(this.get('checkout.id'), [{id, quantity}]).then(checkout => {
      this.set('checkout', checkout);
    });
  },

  removeLineItem(lineItemId) {
    return this.get('client').removeLineItems(this.get('checkout.id'), [lineItemId]).then(checkout => {
      this.set('checkout', checkout);
    });
  }
});
