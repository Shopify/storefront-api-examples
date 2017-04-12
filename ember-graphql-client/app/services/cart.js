import Ember from 'ember';

const { Service, RSVP, inject } = Ember;

export default Service.extend({
  client: inject.service('graphql-js-client'),
  checkout: null,

  init() {
    const client = this.get('client');

    const mutation = gql(client)`
      mutation {
        checkoutCreate(input: {allowPartialAddresses: true, shippingAddress: {city: "Toronto", province: "ON", country: "Canada"}}) {
          userErrors {
            message
            field
          }
          checkout {
            id
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `;

    return client.send(mutation).then((result) => {
      this.set('checkout', result.model.checkoutCreate.checkout);
    });
  },

  addVariants({variantId, quantity}) {
    const client = this.get('client');
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    }

    const mutation = gql(client)`
      mutation ($input: CheckoutLineItemsAddInput!) {
        checkoutLineItemsAdd(input: $input) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `;

    return client.send(mutation, {input}).then((result) => {
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
  */

  removeLineItem(lineItemId) {
    const client = this.get('client');
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItemIds: [lineItemId]
    }

    const mutation = gql(client)`
      mutation ($input: CheckoutLineItemsRemoveInput!) {
        checkoutLineItemsRemove(input: $input) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `;

    return client.send(mutation, {input}).then((result) => {
      this.set('checkout', result.model.checkoutLineItemsRemove.checkout);
    });
  },
});
