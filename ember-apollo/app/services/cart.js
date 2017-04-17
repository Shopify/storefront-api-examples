import Ember from 'ember';
import gql from 'npm:graphql-tag';

const { Service, inject } = Ember;

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    lineItems (first: 250) {
      edges {
        node {
          id
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
`;

export default Service.extend({
  apollo: inject.service(),

  checkout: null,

  init() {
    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            userErrors {
              message
              field
            }
            checkout {
              ...CheckoutFragment
            }
          }
        }
        ${CheckoutFragment}
      `, variables: {input: {allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}}}
    }).then((result) => {
      this.set('checkout', result.checkoutCreate.checkout);
    });
  },

  addVariants({variantId, quantity}) {
    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]) {
          checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            userErrors {
              message
              field
            }
            checkout {
              ...CheckoutFragment
            }
          }
        }
        ${CheckoutFragment}
      `,
      variables: {checkoutId: this.get('checkout.id'), lineItems: [{variantId, quantity}]}
    }).then((result) => {
      this.set('checkout', result.checkoutLineItemsAdd.checkout);
    });
  },

  updateLineItem(lineItemId, quantity) {
    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
          checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
            userErrors {
              message
              field
            }
            checkout {
              ...CheckoutFragment
            }
          }
        }
        ${CheckoutFragment}
      `,
      variables: {checkoutId: this.get('checkout.id'), lineItems: [{id: lineItemId, quantity}]}
    }).then((result) => {
      this.set('checkout', result.checkoutLineItemsUpdate.checkout);
    });
  },

  removeLineItem(lineItemId) {
    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
          checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
            userErrors {
              message
              field
            }
            checkout {
              ...CheckoutFragment
            }
          }
        }
        ${CheckoutFragment}
      `,
      variables: {checkoutId: this.get('checkout.id'), lineItemIds: [lineItemId]}
    }).then((result) => {
      this.set('checkout', result.checkoutLineItemsRemove.checkout);
    });
  },
});

