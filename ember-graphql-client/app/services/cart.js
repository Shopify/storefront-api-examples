import Ember from 'ember';

const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  client: inject.service('graphql-js-client'),
  checkout: null,

  init() {
    const mutation = this.get('client').mutation((root) => {
      root.add('checkoutCreate', {args: {input: {allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}}}}, (checkoutCreate) => {
        checkoutCreate.add('userErrors', (userErrors) => {
          userErrors.add('message');
          userErrors.add('field');
        });
        checkoutCreate.add('checkout', (checkout) => {
          checkout.add('webUrl');
          checkout.add('subtotalPrice');
          checkout.add('totalTax');
          checkout.add('totalPrice');
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

  addVariants({variantId, quantity}) {
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    }

    const mutation = this.get('client').mutation((root) => {
      root.add('checkoutLineItemsAdd', {args: {input}}, (checkoutLineItemsAdd) => {
        checkoutLineItemsAdd.add('userErrors', (userErrors) => {
          userErrors.add('message');
          userErrors.add('field');
        });
        checkoutLineItemsAdd.add('checkout', (checkout) => {
          checkout.add('webUrl');
          checkout.add('subtotalPrice');
          checkout.add('totalTax');
          checkout.add('totalPrice');
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
      this.set('checkout', result.model.checkoutLineItemsAdd.checkout);
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
