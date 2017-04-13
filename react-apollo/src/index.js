import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const networkInterface = createNetworkInterface({ uri: 'https://graphql.myshopify.com/api/graphql' });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['X-Shopify-Storefront-Access-Token'] = 'e911149b96b4eb849a3c5c3551dec717'
    next();
  }
}]);
const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ),
  document.getElementById('root')
);
