import React, { Component } from 'react';
import './css/App.css';
import Product from './components/Product';
import Cart from './components/Cart';
import {client} from './config';


class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      products: [],
      checkout: { lineItems: [] }
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.removeVariantFromCart = this.removeVariantFromCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
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

    client.createCheckout({allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}})
      .then((res) => {
        this.setState({
          checkout: res,
        });
      });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const checkoutId = this.state.checkout.id
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]

    return client.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeVariantFromCart(lineItemId){
    const checkoutId = this.state.checkout.id
    const lineItemIdsToRemove = [lineItemId]

    return client.removeLineItems(checkoutId, lineItemIdsToRemove).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return client.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
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
          removeVariantFromCart={this.removeVariantFromCart}
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
        />
      </div>
    );
  }
}

export default App;
