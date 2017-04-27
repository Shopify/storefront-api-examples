import Ember from 'ember';
import {gql} from 'npm:babel-plugin-graphql-js-client-transform';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    const client = this.get('client');

    const query = gql(client)`
      query {
        shop {
          name
          description
          products(first:20) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                options {
                  name
                  values
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
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
                images(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
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
    `;

    return client.send(query).then((result) => {
      return {
        products: result.model.shop.products,
        shop: result.model.shop,
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
