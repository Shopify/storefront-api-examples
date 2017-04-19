import Ember from 'ember';

export function totalPrice(params) {
  const [unitPrice, quantity] = params;

  return (parseInt(unitPrice, 10) * quantity).toFixed(2);
}

export default Ember.Helper.helper(totalPrice);
