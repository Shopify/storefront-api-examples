import GraphQLJSClient from 'npm:@shopify/graphql-js-client';
import typeBundle from '../types';

const {default: Client} = GraphQLJSClient;

export function initialize(application) {
  const client = new Client(typeBundle, {
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
