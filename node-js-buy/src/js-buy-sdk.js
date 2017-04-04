import fetch from 'node-fetch';
import Client, {Config} from 'shopify-buy';

global.fetch = fetch;

const config = new Config({
  storefrontAccessToken: '663365cfae2c84f0f68ca1006329a694',
  domain: 'graphql.myshopify.com'
});

export default new Client(config);
