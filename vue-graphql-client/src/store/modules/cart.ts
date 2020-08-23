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

  cartSubtotalPrice: (state: CartState) => state.subtotalPrice,

  cartTotalPrice: (state: CartState) => state.totalPrice,

  cartTotalTax: (state: CartState) => state.totalTax,

};

// actions
const actions: ActionTree<CartState, RootState> = {

  ToggleCartVisibility({ commit }) {
    commit('TOGGLE_CART_VISIBILITY');
  },

  // Add a line item to the vuex cart
  // This will then trigger a mutation call to Shopify's
  // checkout api
  // Calling function should provide a variant ID and the quantity to add
  // in the form of a line item object
  addLineItemToCart({ state, commit }, payload) {
    // TODO: Check inputs are valid
    // Call the ShopifyClient object which adds a variant to the checkout
    ShopifyClient.addVariantToCart({
      checkoutId: state.id,
      variantId: payload.variantId,
      quantity: payload.quantity,
    }, (returnPayload: any) => {
      commit('SET_CART_PRICES', {
        subtotalPrice: returnPayload.subtotalPrice,
        totalTax: returnPayload.totalTax,
        totalPrice: returnPayload.totalPrice,
      });
      commit('SET_LINE_ITEMS', returnPayload.lineItems);
    }, () => {
      // TO DO: Add error processing
      console.info('Vuex Action Failed: addLineItemToCart');
    });

    /*
    // Check to see if the variant is already in the cart
    const foundIndex = state.items.findIndex((item) => item.variantId === lineItem.variantId);
    if (foundIndex !== -1) {
      // Variant is already in the cart
      // Use the update cart mutation to adjust
      // the quantity in the cart
      const payload = {
        variantId: lineItem.variantId,
        quantityChange: lineItem.quantity,
      };
      commit('UPDATE_LINE_ITEM_QUANTITY', payload);
    } else {
      // Variant is not in the cart
      // Just add the line item
      ShopifyClient.addVariantToCart(state.id, lineItem, (payload: any) => {
        commit('ADD_LINE_ITEM', lineItem);
      }, () => {
        // TO DO: Add error processing
        console.log('ERROR');
      });
    }
    */
  },

  removeLineItemFromCart({ state, commit }, variantId : string) {
    commit('REMOVE_LINE_ITEM', variantId);
  },

  // Update the quantity of a line item in the vuex cart
  // This will then trigger a mutation call to Shopify's
  // checkout api
  // Calling function should provide a variant ID and the quantity to add
  // or remove
  updateLineItemQuantityInCart({ state, commit },
    payload: { variantId: string, quantityChange: number }) {
    const foundIndex = state.items.findIndex((item) => item.variantId === payload.variantId);
    if (foundIndex !== -1) {
      // Check that the quantity when adjusted doesn't go to zero (or negative)
      if ((state.items[foundIndex].quantity + payload.quantityChange) <= 0) {
        commit('REMOVE_LINE_ITEM', payload.variantId);
      } else {
        commit('UPDATE_LINE_ITEM_QUANTITY', payload);
      }
    }
  },

  // Get the cart object from the Shopify API
  // TODO: Check the session storage to see if a cart object exists
  fetchCart({ commit }) {
    // Get the cart id and other cart info from the ShopifyClient Service
    // and the commit the data to the Cart Store
    ShopifyClient.createCheckout((payload: any) => {
      commit('SET_CART_CHECKOUT_ID', payload.id);
      commit('SET_CART_WEB_URL', payload.webUrl);
      commit('SET_CART_PRICES', {
        subtotalPrice: payload.subtotalPrice,
        totalTax: payload.totalTax,
        totalPrice: payload.totalPrice,
      });
    }, () => {
      // TO DO: Add error processing
      console.log('ERROR');
    });
  },

};

// mutations
const mutations: MutationTree<CartState> = {

  // Toggle the cart visibility flag
  TOGGLE_CART_VISIBILITY(state: CartState) {
    state.visibility = !state.visibility;
  },

  // Set the Cart Checkout ID
  SET_CART_CHECKOUT_ID(state: CartState, checkoutId: string) {
    if (checkoutId) {
      state.id = checkoutId;
    }
  },

  // Set the Cart Web URL
  SET_CART_WEB_URL(state: CartState, webUrl: string) {
    if (webUrl) {
      state.webUrl = webUrl;
    }
  },

  // Set the cart prices. Payload must provide:
  // Subtotal
  // Total Tax
  // Total Price
  SET_CART_PRICES(state: CartState, payload : {
    subtotalPrice : string,
    totalTax : string,
    totalPrice : string,
  }) {
    if (payload.subtotalPrice && payload.totalTax && payload.totalPrice) {
      state.subtotalPrice = payload.subtotalPrice;
      state.totalTax = payload.totalTax;
      state.totalPrice = payload.totalPrice;
    }
  },

  // Overwrite the existing line items with this new array
  // of line items
  SET_LINE_ITEMS(state: CartState, lineItems: LineItem[]) {
    // Remove the items in the existing array and add the new line items
    state.items.splice(0, state.items.length, ...lineItems);
  },

  UPDATE_LINE_ITEM_QUANTITY(state: CartState,
    payload: { variantId: string, quantityChange: number }) {
    // Always check to make sure the variantID is in the cart
    const foundIndex = state.items.findIndex((item) => item.variantId === payload.variantId);
    if (foundIndex !== -1) {
      state.items.splice(foundIndex, 1,
        {
          id: '',
          variantId: payload.variantId,
          quantity: state.items[foundIndex].quantity += payload.quantityChange,
        });
    }
  },

  ADD_LINE_ITEM(state: CartState, lineItem: LineItem) {
    state.items.push(lineItem);
  },

  REMOVE_LINE_ITEM(state: CartState, variantId: string) {
    const index = state.items.findIndex((element) => {
      console.log('Attempting to find cart item');
      return (element.variantId === variantId);
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
  items: [],
  id: '',
  webUrl: '',
  subtotalPrice: '',
  totalTax: '',
  totalPrice: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
