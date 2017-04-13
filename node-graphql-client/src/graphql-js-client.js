import fetch from 'node-fetch';
import Client from 'graphql-js-client';
import typeBundle from './types';

global.fetch = fetch;

export default new Client(typeBundle, {
  url: 'https://graphql.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
    }
  }
});
