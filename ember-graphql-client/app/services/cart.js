import Ember from 'ember';
import {gql} from 'npm:babel-plugin-graphql-js-client-transform';

const { Service, inject } = Ember;

export default Service.extend({
  store: Ember.inject.service('store'),
  client: inject.service('graphql-js-client'),
  checkout: null,

  init() {
    const client = this.get('client');

    return this.get('store').findAll('cart').then((result) => {
      const cartRecord = result.get('lastObject');

      if (cartRecord) {
        const checkoutId = cartRecord.data.checkoutId;

        const query = gql(client)`
          query($id: ID!) {
            node(id: $id) {
              ... on Checkout {
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
                        image {
                          src
                        }
                        price
                      }
                      quantity
                    }
                  }
                }
              }
            }
          }
        `;

        return client.send(query, {id: checkoutId}).then((checkoutResult) => {
          this.set('checkout', checkoutResult.model.node);
        });
      } else {
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
                        image {
                          src
                        }
                        price
                      }
                      quantity
                    }
                  }
                }
              }
            }
          }
        `;

        return client.send(mutation).then((checkoutResult) => {
          this.set('checkout', checkoutResult.model.checkoutCreate.checkout);
          const post = this.get('store').createRecord('cart', {checkoutId: checkoutResult.model.checkoutCreate.checkout.id});

          post.save();
        });
      }
    });

   },

  addVariants({variantId, quantity}) {
    const client = this.get('client');
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    }

    const mutation = gql(client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
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
                    image {
                      src
                    }
                    price
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
                    image {
                      src
                    }
                    price
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
                    image {
                      src
                    }
                    price
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
