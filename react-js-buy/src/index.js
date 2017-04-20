import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client, {Config} from 'shopify-buy';
import './css/index.css';

const config = new Config({
  storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
  domain: 'graphql.myshopify.com',
});

export const client = new Client(config);

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
