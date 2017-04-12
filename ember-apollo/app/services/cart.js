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
    const input = {
      checkoutId: this.get('checkout.id'),
      lineItems: [{variantId, quantity}]
    };

    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($input: CheckoutLineItemsAddInput!) {
          checkoutLineItemsAdd(input: $input) {
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
      variables: {input}
    }).then((result) => {
      this.set('checkout', result.checkoutLineItemsAdd.checkout);
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

    return this.get('apollo').mutate({
      mutation: gql`
        mutation ($input: CheckoutLineItemsRemoveInput!) {
          checkoutLineItemsRemove(input: $input) {
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
      variables: {input}
    }).then((result) => {
      this.set('checkout', result.checkoutLineItemsRemove.checkout);
    });
  },
});

