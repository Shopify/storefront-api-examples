import Client, {Config} from 'shopify-buy';

export function initialize(application) {
  const config = new Config({
    storefrontAccessToken: '663365cfae2c84f0f68ca1006329a694',
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
