import React, { Component } from 'react';
import './css/App.css';
import Product from './components/Product';
import Cart from './components/Cart';
import {client} from './config';


class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: true,
      products: [],
      checkout: { lineItems: [] }
    };

    client.createCheckout({allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}})
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.removeVariantFromCart = this.removeVariantFromCart.bind(this);
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  componentWillMount() {
    client.fetchAllProducts()
      .then((res) => {
        this.setState({
          products: res,
        });
      });
  }

  addVariantToCart(variantId, quantity){
    const input = {
      checkoutId: this.state.checkout.id,
      lineItems: [{variantId, quantity: parseInt(quantity, 10)}]
    }

    return client.addLineItems(input).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeVariantFromCart(lineItemId){
    const input = {
      checkoutId: this.state.checkout.id,
      lineItemIds: [lineItemId]
    }

    return client.removeLineItems(input).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  render() {
    let products = this.state.products.map((product) => {
      return (
        <Product addVariantToCart={this.addVariantToCart} checkout={this.state.checkout} key={product.id.toString()} product={product} />
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
        <Cart removeVariantFromCart={this.removeVariantFromCart} checkout={this.state.checkout} isCartOpen={this.state.isCartOpen} handleCartClose={this.handleCartClose} />
      </div>
    );
  }
}

export default App;
