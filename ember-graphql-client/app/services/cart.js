import Ember from 'ember';

const { Service, inject } = Ember;
let gql;

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
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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

    return client.send(mutation, input).then((result) => {
      this.set('checkout', result.model.checkoutLineItemsAdd.checkout);
    });
  },

  updateLineItem(lineItemId, quantity) {
    const client = this.get('client');

    const mutation = gql(client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
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

    return client.send(mutation, {checkoutId: this.get('checkout.id'), lineItems: [{id: lineItemId, quantity}]}).then((result) => {
      this.set('checkout', result.model.checkoutLineItemsUpdate.checkout);
    });
  },

  removeLineItem(lineItemId) {
    const client = this.get('client');
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItemIds: [lineItemId]
    }

    const mutation = gql(client)`
      mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
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

    return client.send(mutation, input).then((result) => {
      this.set('checkout', result.model.checkoutLineItemsRemove.checkout);
    });
  },
});
