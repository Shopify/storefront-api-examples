import React, { Component } from 'react';
import './css/App.css';
import Product from './components/Product';
import Cart from './components/Cart';
import CustomerAuth from './components/CustomerAuth';
import {client} from './config';

const query = client.query((root) => {
  root.add('shop', (shop) => {
    shop.add('name');
    shop.addConnection('products', {args: {first: 10}}, (product) => {
      product.add('title');
    });
  });
});

// const query = gql(client)`
//   query query {
//     shop {
//       name
//       products(first:20) {
//         pageInfo {
//           hasNextPage
//           hasPreviousPage
//         }
//         edges {
//           node {
//             id
//             title
//             options {
//               name
//               values
//             }
//             variants(first: 250) {
//               pageInfo {
//                 hasNextPage
//                 hasPreviousPage
//               }
//               edges {
//                 node {
//                   id
//                   title
//                   selectedOptions {
//                     name
//                     value
//                   }
//                   image {
//                     src
//                   }
//                   price
//                 }
//               }
//             }
//             images(first: 250) {
//               pageInfo {
//                 hasNextPage
//                 hasPreviousPage
//               }
//               edges {
//                 node {
//                   src
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const CheckoutFragment = gql(client)`
//   fragment CheckoutFragment on Checkout {
//     id
//     webUrl
//     totalTax
//     subtotalPrice
//     totalPrice
//     lineItems (first: 250) {
//       edges {
//         node {
//           id
//           title
//           variant {
//             id
//             title
//             image {
//               src
//             }
//             price
//           }
//           quantity
//         }
//       }
//     }
//   }
// `;
//
// const createCheckout = gql(client)`
//   mutation ($input: CheckoutCreateInput!){
//     checkoutCreate(input: $input) {
//       userErrors {
//         message
//         field
//       }
//       checkout {
//         ...CheckoutFragment
//       }
//     }
//   }
//   ${CheckoutFragment}
// `;
//
// const checkoutLineItemsAdd = gql(client)`
//   mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]) {
//     checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
//       userErrors {
//         message
//         field
//       }
//       checkout {
//         ...CheckoutFragment
//       }
//     }
//   }
//   ${CheckoutFragment}
// `;
//
// const checkoutLineItemsRemove = gql(client)`
//   mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
//     checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
//       userErrors {
//         message
//         field
//       }
//       checkout {
//         ...CheckoutFragment
//       }
//     }
//   }
//   ${CheckoutFragment}
// `;
//
// const checkoutLineItemsUpdate = gql(client)`
//   mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
//     checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
//       userErrors {
//         message
//         field
//       }
//       checkout {
//         ...CheckoutFragment
//       }
//     }
//   }
//   ${CheckoutFragment}
// `;

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      isCustomerAuthOpen: false,
      isNewCustomer: false,
      products: [],
      checkout: { lineItems: { edges: [] } }
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.openCustomerAuth = this.openCustomerAuth.bind(this);
    // this.closeCustomerAuth = this.closeCustomerAuth.bind(this);
    // this.addVariantToCart = this.addVariantToCart.bind(this);
    // this.removeLineItemFromCart = this.removeLineItemFromCart.bind(this);
    // this.updateLineItemInCart = this.updateLineItemInCart.bind(this);
    this.setCustomerAccessToken = this.setCustomerAccessToken.bind(this);
  }

  componentWillMount() {

    client.send(query).then((res) => {
        this.setState({
          products: res.model.shop.products,
        });
      });

    // client.send(createCheckout,
    //   { input: {
    //     allowPartialAddresses: true,
    //     shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}
    //   }}).then((res) => {
    //   this.setState({
    //     checkout: res.model.checkoutCreate.checkout
    //   });
    // });
  }

  handleCartOpen() {
    this.setState({
      isCartOpen: true,
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  openCustomerAuth(event) {
    if (event.target.getAttribute('data-customer-type') === "new-customer") {
      this.setState({
        isNewCustomer: true,
        isCustomerAuthOpen: true
      });
    } else {
      this.setState({
        isCustomerAuthOpen: true,
        isNewCustomer: false
      });
    }
  }

  closeCustomerAuth() {
    this.setState({
      isCustomerAuthOpen: false,
    });
  }

  // addVariantToCart(variantId, quantity){
  //   client.send(checkoutLineItemsAdd, {checkoutId: this.state.checkout.id, lineItems:  [{variantId, quantity: parseInt(quantity, 10)}]}
  //   ).then((res) => {
  //     this.setState({
  //       checkout: res.model.checkoutLineItemsAdd.checkout
  //     });
  //   });
  //
  //   this.handleCartOpen();
  // }
  //
  // removeLineItemFromCart(lineItemId){
  //   client.send(checkoutLineItemsRemove,{ checkoutId: this.state.checkout.id, lineItemIds: [lineItemId] }).then((res) => {
  //     this.setState({
  //       checkout: res.model.checkoutLineItemsRemove.checkout
  //     });
  //   });
  // }
  //
  // updateLineItemInCart(lineItemId, quantity){
  //   client.send(checkoutLineItemsUpdate, { checkoutId: this.state.checkout.id, lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}] })
  //     .then((res) => {
  //     this.setState({
  //       checkout: res.model.checkoutLineItemsUpdate.checkout
  //     });
  //   });
  // }

  setCustomerAccessToken(customerAccessToken){
    this.setState({
      customerAccessToken: customerAccessToken,
      isCustomerAuthOpen: false
    });
  }

  render() {
    let products = this.state.products.map((product) => {
      return (
        <Product addVariantToCart={this.addVariantToCart} checkout={this.state.checkout} key={product.node.id.toString()} product={product.node} />
      );
    });
    return (
      <div className="App">
        <CustomerAuth
          closeCustomerAuth={this.closeCustomerAuth}
          isCustomerAuthOpen={this.state.isCustomerAuthOpen}
          newCustomer={this.state.isNewCustomer}
          setCustomerAccessToken={this.setCustomerAccessToken}
        />
        <header className="App__header">
          <ul className="App__nav">
            <li className="button App__customer-actions" onClick={this.openCustomerAuth} data-customer-type="new-customer">Create an Account</li>
            <li className="login App__customer-actions" onClick={this.openCustomerAuth}>Log in</li>
          </ul>
          <div className="App__title">
            <h1>Site Name</h1>
            <h2>Subtitle for your site goes here</h2>
          </div>
        </header>
        <div className="Product-wrapper">
          { products }
        </div>
        <Cart
          removeLineItemFromCart={this.removeLineItemFromCart}
          updateLineItemInCart={this.updateLineItemInCart}
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          customerAccessToken={this.state.customerAccessToken}
        />
      </div>
    );
  }
}

export default App;
