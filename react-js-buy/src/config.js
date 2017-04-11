import Client, {Config} from 'shopify-buy';

const config = new Config({
  storefrontAccessToken: 'e911149b96b4eb849a3c5c3551dec717',
  domain: 'graphql.myshopify.com',
});

export const client = new Client(config);
