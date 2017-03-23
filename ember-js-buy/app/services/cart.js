import Ember from 'ember';

const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  client: inject.service('js-buy-sdk-client'),
  checkout: null,

  // line items currently hard coded so I can do other things
  init() {
    this.get('client').createCheckout({lineItems: [{variantId:'gid://shopify/ProductVariant/25602235976', quantity: 5}, {variantId: 'gid://shopify/ProductVariant/29106022792', quantity: 10}]}).then(checkout => {
      this.set('checkout', checkout);
    });
  },

  // dummy checkout url
  checkoutUrl: 'https://google.com',

  lineItems: computed.alias('checkout.lineItems'),
/*
  addVariants() {
    const variants = [].slice.call(arguments);
    const lineItems = this.get('lineItems');

    variants.forEach(item => {
      lineItems.push({ variant_id: item.variantId, quantity: item.quantity });
    });

    return this.update();
  },

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

  update() {
    const checkout = this.get('checkout');
    const client = this.get('client');

    return client.update('checkouts', checkout).then(newCheckout => {
      this.set('checkout.attrs', newCheckout.attrs);

      return checkout;
    });
  }
*/
});
