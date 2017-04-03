import Ember from 'ember';
import gql from 'npm:graphql-tag';

const { Service, RSVP, computed, inject } = Ember;

export default Service.extend({
  apollo: inject.service(),

  checkout: null,

  init() {
    return this.get('apollo').mutate({
      mutation: gql`
        mutation {
          checkoutCreate(input: {}) {
            userErrors {
              message
              field
            }
            checkout {
              id
              webUrl
              lineItems (first: 250) {
                edges {
                  node {
                    title
                    variant {
                      id
                      title
                    }
                    quantity
                  }
                }
              }
            }
          }
        }
      `
    }).then((result) => {
      this.set('checkout', result.checkoutCreate.checkout);
    });
  },

  checkoutUrl: computed.alias('checkout.webUrl'),

  lineItems: computed.alias('checkout.lineItems'),

  addVariants({variantId, quantity}) {
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    };

    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($input: CheckoutAddLineItemsInput!) {
          checkoutAddLineItems(input: $input) {
            userErrors {
              message
              field
            }
            checkout {
              id
              webUrl
              lineItems (first: 250) {
                edges {
                  node {
                    title
                    variant {
                      id
                      title
                    }
                    quantity
                  }
                }
              }
            }
          }
        }
      `,
      variables: {input}
    }).then((result) => {
      this.set('checkout', result.checkoutAddLineItems.checkout);
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

