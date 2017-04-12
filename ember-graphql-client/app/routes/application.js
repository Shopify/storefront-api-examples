import Ember from 'ember';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    const client = this.get('client');

    const query = gql(client)`
      query {
        shop {
          name
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
        shopName: result.model.shop.name,
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
