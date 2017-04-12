import fetch from 'node-fetch';
import Client, {Config} from 'shopify-buy';

global.fetch = fetch;

const config = new Config({
  storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
  domain: 'graphql.myshopify.com'
});

export default new Client(config);
