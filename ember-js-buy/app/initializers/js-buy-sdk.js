import Client, {Config} from 'shopify-buy';

export function initialize(application) {
  const config = new Config({
    storefrontAccessToken: '0dc0448815bdf506934101c6d39ec244',
    domain: 'sendmecats.myshopify.com',
  });

  const client = new Client(config);

  application.register('service:js-buy-sdk-client', client, { instantiate: false });
  application.inject('route', 'client', 'service:js-buy-sdk-client');
}

export default {
  name: 'js-buy-sdk',
  initialize
};
