import Client from 'npm:@shopify/graphql-js-client';
import typeBundle from '../types';

export function initialize(application) {
  const client = new Client.default(typeBundle, {
    url: 'https://graphql.myshopify.com/api/graphql',
    fetcherOptions: {
      headers: {
        Authorization: 'Basic NjYzMzY1Y2ZhZTJjODRmMGY2OGNhMTAwNjMyOWE2OTQK'
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
