import ShopifyBuy from 'npm:shopify-buy';

const {default: Client, Config} = ShopifyBuy;

export function initialize(application) {
  const config = new Config({
    storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
    domain: 'graphql.myshopify.com',
  });

  const client = new Client(config);

  application.register('service:js-buy-sdk-client', client, { instantiate: false });
  application.inject('route', 'client', 'service:js-buy-sdk-client');
}

export default {
  name: 'js-buy-sdk',
  initialize
};
