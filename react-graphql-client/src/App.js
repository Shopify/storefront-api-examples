import React, { Component } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';

let gql;

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
  }

  componentWillMount() {
    const client = this.props.client;

    client.send(gql(client)`
      mutation {
        checkoutCreate(input: {allowPartialAddresses: true, shippingAddress: {city: "Toronto", province: "ON", country: "Canada"}}) {
          userErrors {
            message
            field
          }
          checkout {
            id
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `).then((res) => {
      this.setState({
        checkout: res.model.checkoutCreate.checkout,
      });
    });

    client.send(gql(client)`
      query {
        shop {
          name
          description
          products(first:20) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                options {
                  name
                  values
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      title
                      selectedOptions {
                        name
                        value
                      }
                      image {
                        src
                      }
                      price
                    }
                  }
                }
                images(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `).then((res) => {
      this.setState({
        shop: res.model.shop,
        products: res.model.shop.products,
      });
    });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItems = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.send(gql(this.props.client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `, {checkoutId, lineItems}).then(res => {
      this.setState({
        checkout: res.model.checkoutLineItemsAdd.checkout,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItems = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.send(gql(this.props.client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `, {checkoutId, lineItems}).then(res => {
      this.setState({
        checkout: res.model.checkoutLineItemsUpdate.checkout,
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
          {!this.state.isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>Cart</button>
            </div>
          }
          <div className="App__title">
            <h1>{this.state.shop.name}</h1>
            <h2>{this.state.shop.description}</h2>
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
