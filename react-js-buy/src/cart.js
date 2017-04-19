import {client} from './config';

export function addVariantToCart(variantId, quantity){
  this.setState({
    isCartOpen: true,
  });

  const checkoutId = this.state.checkout.id
  const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]

  return client.addLineItems(checkoutId, lineItemsToAdd).then(res => {
    this.setState({
      checkout: res,
    });
  });
};

export function removeVariantFromCart(lineItemId){
  const checkoutId = this.state.checkout.id
  const lineItemIdsToRemove = [lineItemId]

  return client.removeLineItems(checkoutId, lineItemIdsToRemove).then(res => {
    this.setState({
      checkout: res,
    });
  });
};

export function updateQuantityInCart(lineItemId, quantity) {
  const checkoutId = this.state.checkout.id
  const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

  return client.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
    this.setState({
      checkout: res,
    });
  });
};
