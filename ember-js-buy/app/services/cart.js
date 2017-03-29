import Ember from 'ember';

const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  client: inject.service('js-buy-sdk-client'),
  checkout: null,

  init() {
    this.get('client').createCheckout().then(checkout => {
      this.set('checkout', checkout);
    });
  },

  checkoutUrl: computed.alias('checkout.webUrl'),

  lineItems: computed.alias('checkout.lineItems'),

  addVariants({variantId, quantity}) {
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    }

    return this.get('client').addLineItems(input).then(checkout => {
      this.set('checkout', checkout);
    });
  },

  /*
  updateLineItem(lineItemId, quantity) {
    const lineItem = this.get('lineItems').findBy('id', lineItemId);

    let result;

    if (lineItem) {
      lineItem.quantity = quantity;
      result = this.update();
    } else {
      result = new RSVP.Promise((resolve, reject) => {
        reject(new Error(`Line Item id: ${lineItemId} does not exist`));
      });
    }

    return result;
  },

  clearLineItems() {
    this.set('lineItems', []);

    return this.update();
  },

  removeLineItem(lineItemId) {
    const lineItemsWithoutItem = this.get('lineItems').rejectBy('id', lineItemId);

    this.set('lineItems', lineItemsWithoutItem);

    return this.update();
  },
*/
});
