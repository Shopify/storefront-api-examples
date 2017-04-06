import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    return RSVP.hash({
      shopName: this.get('client').fetchShopInfo().then((result) => {
        return result.name;
      }),
      isCartOpen: false,
      products: this.get('client').fetchAllProducts()
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
