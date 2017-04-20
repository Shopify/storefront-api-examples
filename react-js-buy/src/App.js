import React, { Component } from 'react';
import './css/App.css';
import Products from './components/Products';
import Cart from './components/Cart';


class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: []
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
  }

  componentWillMount() {
    this.props.client.createCheckout({
      allowPartialAddresses: true,
      shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}
      }).then((res) => {
        this.setState({
          checkout: res,
        });
      });

    this.props.client.fetchAllProducts()
      .then((res) => {
        this.setState({
          products: res,
        });
      });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
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
    return (
      <div className="App">
        <header className="App__header">
          <div className="App__title">
            <h1>Site Name</h1>
            <h2>Subtitle for your site goes here</h2>
          </div>
        </header>
        <Products
          products={this.state.products}
          addVariantToCart={this.addVariantToCart}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
        />
      </div>
    );
  }
}

export default App;
