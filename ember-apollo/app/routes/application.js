import Ember from 'ember';
import gql from 'npm:graphql-tag';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  apollo: Ember.inject.service(),

  model() {
    return this.get('apollo').queryOnce({
      query: gql`
        query {
          shop {
            name
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
      return {
        products: result.shop.products.edges,
        shopName: result.shop.name,
        isCartOpen: false
      };
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
