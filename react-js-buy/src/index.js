import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'shopify-buy';
import '../../shared/app.css';

const client = Client.buildClient({
  storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
  domain: 'graphql.myshopify.com'
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
