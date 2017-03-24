import { encodedStorefrontAcessToken } from './../variables';
import Shop from './components/Shop';
import ShopRoute from './routes/ShopRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

console.log(encodedStorefrontAcessToken);

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://shop1.myshopify.io/api/graphql', {
    headers: { Authorization:'Basic ' + encodedStorefrontAcessToken },
  }),
);

ReactDOM.render(
  <Relay.RootContainer
    Component={Shop}
    route={new ShopRoute()}
  />,
  document.getElementById('root')
);
