import Ember from 'ember';
import RSVP from 'rsvp';
import gql from 'npm:graphql-tag';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  apollo: Ember.inject.service(),

  model() {
    const shopName = this.get('apollo').queryOnce({
      query: gql`
        query {
          shop {
            name
          }
        }
      `
    }).then((result) => {
      return result.shop.name;
    });

    const products = this.get('apollo').queryOnce({
      query: gql`
        query {
          shop {
            products (first: 20) {
              edges {
                node {
                  id
                  title
                  options {
                    name
                    values
                  }
                  variants (first: 250) {
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image {
                          src
                        }
                        price
                      }
                    }
                  }
                  images (first: 250) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    }).then((result) => {
      return result.shop.products.edges;
    });

    return RSVP.hash({
      isCartOpen: false,
      products,
      shopName
    });
  },

  actions: {
    closeCart() {
      this.set('controller.model.isCartOpen', false);
    },
    openCart() {
      this.set('controller.model.isCartOpen', true);
    }
  }
});
