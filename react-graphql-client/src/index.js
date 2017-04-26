import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'graphql-js-client';
import typeBundle from './types';
import '../../shared/app.css';

export const client = new Client(typeBundle, {
  url: 'https://graphql.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
    }
  }
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
