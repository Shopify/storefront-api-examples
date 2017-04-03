import Ember from 'ember';

export function isEqual([leftSide, rightSide]) {
  return leftSide === rightSide;
}

export default Ember.Helper.helper(isEqual);
