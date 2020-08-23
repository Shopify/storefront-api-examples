import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ProductsState, Product, ProductVariant } from './products.types';
import { RootState } from '../index.type';
import ShopifyClient from '../../services/shopifyClient';

// storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
// domain: 'graphql.myshopify.com'

// getters
const getters: GetterTree<ProductsState, RootState> = {

  productsAll: (state: ProductsState) => state.all,

  productsKeys: (state: ProductsState) => Object.keys(state.all),

  productsCount: (state: ProductsState) => Object.keys(state.all).length,

  productById: (state: ProductsState) => (id: string) => state.all[id],

  productTitleById: (state: ProductsState) => (id: string) => state.all[id].title,

  productByVariantId: (state: ProductsState) => (variantId: string) => {
    let product: Product | null = null;
    // Get the length of the array of products
    const { length } = Object.keys(state.all);
    // Walk through the array of product objects
    for (let i = 0; i < length; i += 1) {
      const findIndex = state.all[Object.keys(
        state.all,
      )[i]].variants.findIndex((variant: ProductVariant) => variant.id === variantId);
      if (findIndex !== -1) {
        product = state.all[Object.keys(state.all)[i]];
        break;
      }
    }
    return product;
  },

  productTitleByVariantId: (state: ProductsState, productGetters: any) => (variantId: string) => {
    const product: Product | undefined = productGetters.productByVariantId(variantId);
    return product?.title || '';
  },

  variantTitleByVariantId: (state: ProductsState, productGetters: any) => (variantId: string) => {
    const product: Product | undefined = productGetters.productByVariantId(variantId);
    let variant : ProductVariant | undefined;
    if (product) {
      variant = state.all[product?.id].variants
        .find((element) => element.id === variantId);
    }
    return variant?.title || 'Error';
  },

  variantPriceByVariantId: (state: ProductsState, productGetters: any) => (variantId: string) => {
    const product: Product | undefined = productGetters.productByVariantId(variantId);
    let variant : ProductVariant | undefined;
    if (product) {
      variant = state.all[product?.id].variants
        .find((element) => element.id === variantId);
    }
    return variant?.price || 'Error';
  },

  variantImgSrcByVariantId: (state: ProductsState, productGetters: any) => (variantId: string) => {
    // TODO: If the product object doesn't have an image use a category default
    // Grab the product image because we know a product *should* have an image
    const product: Product | undefined = productGetters.productByVariantId(variantId);
    let variant : ProductVariant | undefined;
    let imageSrc = '';
    if (product) {
      // get the product image
      imageSrc = product.images[0].src;
      variant = product.variants.find((element) => element.id === variantId);
    }
    return variant?.imageSrc || imageSrc;
  },

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
