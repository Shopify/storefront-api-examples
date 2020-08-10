import { ActionTree, MutationTree } from 'vuex';
import { ProductsState, Product } from './products.types';
import { RootState } from '../index.type';
import ShopifyClient from '../../services/shopifyClient';

// storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
// domain: 'graphql.myshopify.com'

// getters
const getters = {

  productsAll: (state: ProductsState) => state.all,

  productsKeys: (state: ProductsState) => Object.keys(state.all),

  productsCount: (state: ProductsState) => Object.keys(state.all).length,

  productById: (state: ProductsState) => (id: string) => state.all[id],

  // productCounts: (state: ProductsState) => { return Object.keys(state.all).length; },

};

// actions
const actions: ActionTree<ProductsState, RootState> = {

  // Get all of the products from Shopify API
  fetchAllProducts({ commit }) {
    // const productsService = new ProductsService();

    // Get the products from the ShopifyClient Service and then
    // commit the products to the Products Store
    ShopifyClient.getAllProducts((products: Product[]) => {
      commit('setProducts', products);
    }, () => {
      // TO DO: Add error processing
      console.log('ERROR');
    });
  },

};

// mutations
const mutations: MutationTree<ProductsState> = {

  setProducts(state: ProductsState, products: { [key: string]: Product }) {
    state.all = products;
  },

};

// default state
const state: ProductsState = {
  all: {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
