
const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  client: inject.service('js-buy-sdk-client'),
  checkout: null,

  init() {
    return this.get('client').createCheckout({allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}}).then(checkout => {
      this.set('checkout', checkout);
    });
  },

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
  */

  removeLineItem(lineItemId) {
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItemIds: [lineItemId]
    }

    return this.get('client').removeLineItems(input).then(checkout => {
      this.set('checkout', checkout);
    });
  }
});
