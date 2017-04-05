import React, { Component } from 'react';
import './css/App.css';
import Client, {Config} from 'shopify-buy';
import Product from './components/Product';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: true,
      products: [],
    };

    this.handleCartClose = this.handleCartClose.bind(this);
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  componentWillMount() {
    const config = new Config({
      storefrontAccessToken: '663365cfae2c84f0f68ca1006329a694',
      domain: 'graphql.myshopify.com',
    });

    const client = new Client(config);
    client.fetchAllProducts()
      .then((res) => {
        this.setState({
          products: res,
        });
      });
  }

  render() {
    let products = this.state.products.map((product) => {
      return (
        <Product key={product.id.toString()} product={product} />
      );
    });

    return (
      <div className="App">
        <header className="App__header">
          <h1>Site Name</h1>
          <h2>Subtitle for your site goes here</h2>
        </header>
        <div className="Product-wrapper">
          {products}
        </div>
        <Cart isCartOpen={this.state.isCartOpen} handleCartClose={this.handleCartClose} />
      </div>
    );
  }
}

export default App;
