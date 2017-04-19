import GraphQLClient from 'graphql-js-client';

// This is the generated type bundle from graphql-js-schema
import types from './types.js';

export const client = new GraphQLClient(types, {
  url: 'https://graphql.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: `Authorization: Basic dd4d4dc146542ba7763305d71d1b3d38=`
  }
});
