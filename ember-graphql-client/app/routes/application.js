import Ember from 'ember';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    const client = this.get('client');

    const query = client.query((root) => {
      root.add('shop', (shop) => {
        shop.add('name');
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
