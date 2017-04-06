import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    const client = this.get('client');

    const shopQuery = client.query((root) => {
      root.add('shop', (shop) => {
        shop.add('name');
      });
    });

    const productsQuery = client.query((root) => {
      root.add('shop', (shop) => {
        shop.addConnection('products', {args: {first: 20}}, (products) => {
          products.add('id');
          products.add('title');
          products.add('options', (options) => {
            options.add('name');
            options.add('values');
          });
          products.addConnection('variants', {args: {first:250}}, (variants) => {
            variants.add('title');
            variants.add('selectedOptions', (selectedOptions) => {
              selectedOptions.add('name');
              selectedOptions.add('value');
            });
            variants.add('image', (image) => {
              image.add('src');
            });
            variants.add('price');
          });
          products.addConnection('images', {args: {first:250}}, (images) => {
            images.add('src');
          });
        });
      });
    });

    const products = client.send(productsQuery).then((result) => {
      return result.model.shop.products;
    });

    const shopName = client.send(shopQuery).then((result) => {
      return result.model.shop.name;
    });

    return RSVP.hash({
      isCartOpen: false,
      shopName,
      products
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
