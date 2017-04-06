import fetch from 'node-fetch';
import Client from 'graphql-js-client';
import typeBundle from './types';

global.fetch = fetch;

export default new Client(typeBundle, {
  url: 'https://graphql.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      Authorization: 'Basic NjYzMzY1Y2ZhZTJjODRmMGY2OGNhMTAwNjMyOWE2OTQK'
    }
  }
});
