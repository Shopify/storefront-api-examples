import React, { Component } from 'react';
import './css/App.css';
import Product from './components/Product';
import Cart from './components/Cart';
import {client} from './config';
import {addVariantToCart, updateQuantityInCart} from './cart'


class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      products: [],
      checkout: { lineItems: [] }
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = addVariantToCart.bind(this);
    this.updateQuantityInCart = updateQuantityInCart.bind(this);
  }

  componentWillMount() {
    client.fetchAllProducts()
      .then((res) => {
        this.setState({
          products: res,
        });
      });

    client.createCheckout({
      allowPartialAddresses: true,
      shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}
      }).then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {
    let products = this.state.products.map((product) => {
      return (
        <Product
          addVariantToCart={this.addVariantToCart}
          checkout={this.state.checkout}
          key={product.id.toString()}
          product={product}
        />
      );
    });

    return (
      <div className="App">
        <header className="App__header">
          <div className="App__title">
            <h1>Site Name</h1>
            <h2>Subtitle for your site goes here</h2>
          </div>
        </header>
        <div className="Product-wrapper">
          {products}
        </div>
        <Cart
          updateQuantityInCart={this.updateQuantityInCart}
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
        />
      </div>
    );
  }
}

export default App;
