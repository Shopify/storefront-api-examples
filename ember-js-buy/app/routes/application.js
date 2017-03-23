import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    return RSVP.hash({
      isCartOpen: true,
      products: this.get('client').fetchAllProducts()
    });
  },

  actions: {
    closeCart() {
      const model = this.set('controller.model.isCartOpen', false);
    },
    openCart() {
      const model = this.set('controller.model.isCartOpen', true);
    }
  }
});

