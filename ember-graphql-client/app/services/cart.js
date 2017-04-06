import Ember from 'ember';

const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  client: inject.service('graphql-js-client'),
  checkout: null,

  init() {
    const mutation = this.get('client').mutation((root) => {
      root.add('checkoutCreate', {args: {input:{}}}, (checkoutCreate) => {
        checkoutCreate.add('userErrors', (userErrors) => {
          userErrors.add('message');
          userErrors.add('field');
        });
        checkoutCreate.add('checkout', (checkout) => {
          checkout.add('webUrl');
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

    return this.get('client').send(mutation).then((result) => {
      this.set('checkout', result.model.checkoutCreate.checkout);
    });
  },

  checkoutUrl: computed.alias('checkout.webUrl'),

  lineItems: computed.alias('checkout.lineItems'),

  addVariants({variantId, quantity}) {
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    }

    const mutation = this.get('client').mutation((root) => {
      root.add('checkoutAddLineItems', {args: {input}}, (checkoutAddLineItems) => {
        checkoutAddLineItems.add('userErrors', (userErrors) => {
          userErrors.add('message');
          userErrors.add('field');
        });
        checkoutAddLineItems.add('checkout', (checkout) => {
          checkout.add('webUrl');
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

    this.get('client').send(mutation).then((result) => {
      this.set('checkout', result.model.checkoutAddLineItems.checkout);
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
