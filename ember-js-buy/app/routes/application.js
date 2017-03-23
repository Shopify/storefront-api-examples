import Ember from 'ember';

export default Ember.Route.extend({
  cart: Ember.inject.service(),

  model() {
    return this.get('client').fetchAllProducts();
  }
});

