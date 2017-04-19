import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ),
  document.getElementById('root')
);
