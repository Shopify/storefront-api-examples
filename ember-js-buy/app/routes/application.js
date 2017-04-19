import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    return RSVP.hash({
      shop: this.get('client').fetchShopInfo().then((result) => {
        return result;
      }),
      products: this.get('client').fetchAllProducts(),
      isCartOpen: RSVP.resolve(false)
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
