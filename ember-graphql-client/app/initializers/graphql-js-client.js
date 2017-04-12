import GraphQLJSClient from 'npm:graphql-js-client';
import typeBundle from '../types';

const {default: Client} = GraphQLJSClient;

export function initialize(application) {
  const client = new Client(typeBundle, {
    url: 'https://graphql.myshopify.com/api/graphql',
    fetcherOptions: {
      headers: {
        'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
      }
    }
  });

  application.register('service:graphql-js-client', client, { instantiate: false });
  application.inject('route', 'client', 'service:graphql-js-client');
}

export default {
  name: 'graphql-js-client',
  initialize
};
