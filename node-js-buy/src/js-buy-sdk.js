import fetch from 'node-fetch';
import Client from 'shopify-buy';

global.fetch = fetch;

const client = Client.buildClient({
  storefrontAccessToken: '20ef0127c6c37cee73dd149879a379a8',
  domain: 'demofnstore.myshopify.com'
});

export default client;
