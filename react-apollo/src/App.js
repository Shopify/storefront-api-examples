import React, { Component } from 'react';
import './css/App.css';
import Product from './components/Product';
import Cart from './components/Cart';
import CustomerAuthWithMutation from './components/CustomerAuth';
import { graphql, gql, compose } from 'react-apollo'

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
    this.closeCustomerAuth = this.closeCustomerAuth.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.removeLineItemFromCart = this.removeLineItemFromCart.bind(this);
    this.updateLineItemInCart = this.updateLineItemInCart.bind(this);
    this.setCustomerAccessToken = this.setCustomerAccessToken.bind(this);
  }

  componentWillMount() {
    this.props.createCheckout(
      { variables: { input: {
        allowPartialAddresses: true,
        shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}
        }}
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutCreate.checkout
      });
    });
  }

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      shop: React.PropTypes.object,
    }).isRequired,
    createCheckout: React.PropTypes.func.isRequired,
    checkoutLineItemsAdd: React.PropTypes.func.isRequired,
    checkoutLineItemsRemove: React.PropTypes.func.isRequired,
    checkoutLineItemsUpdate: React.PropTypes.func.isRequired,
    customerAccessTokenCreate: React.PropTypes.func.isRequired
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

  addVariantToCart(variantId, quantity){
    this.props.checkoutLineItemsAdd(
      { variables: { checkoutId: this.state.checkout.id, lineItems:  [{variantId, quantity: parseInt(quantity, 10)}] }
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutLineItemsAdd.checkout
      });
    });

    this.handleCartOpen();
  }

  removeLineItemFromCart(lineItemId){
    this.props.checkoutLineItemsRemove(
      { variables: { checkoutId: this.state.checkout.id, lineItemIds: [lineItemId] }
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutLineItemsRemove.checkout
      });
    });
  }

  updateLineItemInCart(lineItemId, quantity){
    this.props.checkoutLineItemsUpdate(
      { variables: { checkoutId: this.state.checkout.id, lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}] }
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutLineItemsUpdate.checkout
      });
    });
  }

  setCustomerAccessToken(customerAccessToken){
    this.setState({
      customerAccessToken: customerAccessToken,
      isCustomerAuthOpen: false
    });
  }

  render() {
    if (this.props.data.loading) {
      return <p>Loading ...</p>;
    }
    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }

    return (
      <div className="App">
        <CustomerAuthWithMutation
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
          { this.props.data.shop.products.edges.map(product =>
            <Product addVariantToCart={this.addVariantToCart} checkout={this.state.checkout} key={product.node.id.toString()} product={product.node} />
          )}
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

const shopQuery = gql`
  query shopQuery {
    shop {
      name
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
                  id
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
`;

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    lineItems (first: 250) {
      edges {
        node {
          id
          title
          variant {
            id
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
`;

const createCheckout = gql`
  mutation ($input: CheckoutCreateInput!){
    checkoutCreate(input: $input) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

const checkoutLineItemsAdd = gql`
  mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

const checkoutLineItemsRemove = gql`
  mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

const checkoutLineItemsUpdate = gql`
  mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

const AppWithDataAndMutation = compose(
  graphql(shopQuery),
  graphql(createCheckout, {name: "createCheckout"}),
  graphql(checkoutLineItemsAdd, {name: "checkoutLineItemsAdd"}),
  graphql(checkoutLineItemsRemove, {name: "checkoutLineItemsRemove"}),
  graphql(checkoutLineItemsUpdate, {name: "checkoutLineItemsUpdate"}),
  graphql(customerAccessTokenCreate, {name: "customerAccessTokenCreate"})
)(App);

export default AppWithDataAndMutation;
