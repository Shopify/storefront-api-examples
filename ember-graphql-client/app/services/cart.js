import Ember from 'ember';

const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  client: inject.service('graphql-js-client'),
  checkout: null,

  // line items currently hard coded so I can do other things
  init() {
    const input = {
      lineItems: [
        {variantId:'gid://shopify/ProductVariant/25602235976', quantity: 5},
        {variantId: 'gid://shopify/ProductVariant/29106022792', quantity: 10}
      ]
    };

    const mutation = this.get('client').mutation((root) => {
      root.add('checkoutCreate', {args: {input}}, (checkoutCreate) => {
        checkoutCreate.add('userErrors', (userErrors) => {
          userErrors.add('message');
          userErrors.add('field');
        });
        checkoutCreate.add('checkout', (checkout) => {
          checkout.addConnection('lineItems', {args: {first: 250}}, (lineItems) => {
            lineItems.add('title');
            lineItems.add('variant', (variant) => {
              variant.add('title');
            });
            lineItems.add('quantity');
          });
        });
      });
    });

    this.get('client').send(mutation).then((checkout) => {
      this.set('checkout', checkout.model.checkoutCreate.checkout);
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
