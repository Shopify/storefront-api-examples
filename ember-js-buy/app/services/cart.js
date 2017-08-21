import Ember from 'ember';

const { Service, inject } = Ember;

export default Service.extend({
  store: Ember.inject.service('store'),
  client: inject.service('js-buy-sdk-client'),
  checkout: null,

  init() {
    return this.get('store').findAll('cart').then((result) => {
      const cartRecord = result.get('lastObject');

      if (cartRecord) {
        const checkoutId = cartRecord.data.checkoutId;

        return this.get('client').fetchCheckout(checkoutId.substring(checkoutId.lastIndexOf('/') + 1)).then(checkout => {
          this.set('checkout', checkout);
        });
      } else {
        return this.get('client').createCheckout({}).then(checkout => {
          this.set('checkout', checkout);
          const post = this.get('store').createRecord('cart', {checkoutId: checkout.id});
          post.save();
        });
      }
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
