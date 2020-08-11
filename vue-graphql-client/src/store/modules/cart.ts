import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '../index.type';
import { CartState, LineItem } from './cart.types';
import ShopifyClient from '../../services/shopifyClient';

// getters
const getters = {

  cartVisibility: (state: CartState) => state.visibility,

  cartItems: (state: CartState) => state.items,

  cartProductsCount: (state: CartState) => {
    let productCount = 0;
    state.items.forEach((element : LineItem) => {
      productCount += element.quantity;
    });
    return productCount;
  },

};

// actions
const actions: ActionTree<CartState, RootState> = {

  ToggleCartVisibility({ commit }) {
    commit('TOGGLE_CART_VISIBILITY');
  },

  removeLineItemFromCart({ state, commit }, lineItem : LineItem) {
    commit('REMOVE_LINE_ITEM', lineItem);
  },

  // Update the quantity of a line item in the vuex cart store
  // If the quantity is being updated to zero then we remove
  // the line item from the cart
  // TODO: in the future add a checkout mutation against
  // the shopify store api
  UpdateLineItemInCart({ state, commit }, lineItem : LineItem) {
    if (lineItem.quantity === 0) {
      commit('REMOVE_LINE_ITEM', lineItem);
    } else {
      commit('UPDATE_LINE_ITEM_QUANTITY', lineItem);
    }
  },

  // Add line item to the vuex cart store
  // TODO: in future add a checkout mutation against
  // the shopify store api
  AddLineItemToCart({ state, commit }, lineItem) {
    let isFound = false;
    let oldQuantity = 0;
    // Loop through the shopping cart items to see if the thing
    // is already in the list
    state.items.forEach((element) => {
      if (element.productId === lineItem.productId
        && element.variantId === lineItem.variantId) {
        isFound = true;
        oldQuantity = element.quantity;
      }
    });
    // If it's in the list just update the quantity else add a new line item
    if (isFound) {
      // Update the quantity
      const newLineItem : LineItem = {
        productId: lineItem.productId,
        variantId: lineItem.variantId,
        quantity: oldQuantity + lineItem.quantity,
      };
      commit('UPDATE_LINE_ITEM_QUANTITY', newLineItem);
    } else {
      commit('ADD_LINE_ITEM', lineItem);
    }
  },

};

// mutations
const mutations: MutationTree<CartState> = {

  TOGGLE_CART_VISIBILITY(state: CartState) {
    state.visibility = !state.visibility;
  },

  UPDATE_LINE_ITEM_QUANTITY(state: CartState, lineItem: LineItem) {
    const index = state.items.findIndex((element) => {
      console.log('Attempting to find cart item');
      return (element.productId === lineItem.productId && element.variantId === lineItem.variantId);
    });
    // Add/Replace the line item
    if (index !== -1) {
      state.items.splice(index, 1, {
        ...lineItem,
      });
    }
  },

  ADD_LINE_ITEM(state: CartState, lineItem: LineItem) {
    state.items.push(lineItem);
  },

  REMOVE_LINE_ITEM(state: CartState, lineItem: LineItem) {
    const index = state.items.findIndex((element) => {
      console.log('Attempting to find cart item');
      return (element.productId === lineItem.productId && element.variantId === lineItem.variantId);
    });
    // Remove the line item
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },
};

// initial state
const state: CartState = {
  visibility: false,
  checkoutId: '',
  items: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
