import React, { Component } from 'react';
import './css/App.css';
import Product from './components/Product';
import Cart from './components/Cart';
import CustomerAuth from './components/CustomerAuth';
import { graphql, gql, compose } from 'react-apollo'

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      isCustomerAuthOpen: false,
      products: [],
      checkout: { lineItems: { edges: [] } }
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.openCustomerAuth = this.openCustomerAuth.bind(this);
    this.closeCustomerAuth = this.closeCustomerAuth.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.removeVariantFromCart = this.removeVariantFromCart.bind(this);
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

  addVariantToCart(variantId, quantity){
    const input = {
      checkoutId: this.state.checkout.id,
      lineItems: [{variantId, quantity: parseInt(quantity, 10)}]
    }

    this.props.checkoutLineItemsAdd(
      { variables: { input }
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutLineItemsAdd.checkout
      });
    });

    this.handleCartOpen();
  }

  removeVariantFromCart(lineItemId){
    const input = {
      checkoutId: this.state.checkout.id,
      lineItemIds: [lineItemId]
    }

    this.props.checkoutLineItemsRemove(
      { variables: { input }
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutLineItemsRemove.checkout
      });
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
        <CustomerAuth
          isCustomerAuthOpen={this.state.isCustomerAuthOpen}
          closeCustomerAuth={this.closeCustomerAuth}
        />
        <header className="App__header">
          <h1>Site Name</h1>
          <h2>Subtitle for your site goes here</h2>
        </header>
        <div className="Product-wrapper">
          { this.props.data.shop.products.edges.map(product =>
            <Product addVariantToCart={this.addVariantToCart} checkout={this.state.checkout} key={product.node.id.toString()} product={product.node} />
          )}
        </div>
        <Cart removeVariantFromCart={this.removeVariantFromCart} checkout={this.state.checkout} isCartOpen={this.state.isCartOpen} handleCartClose={this.handleCartClose} />
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
  mutation ($input: CheckoutLineItemsAddInput!) {
    checkoutLineItemsAdd(input: $input) {
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
  mutation ($input: CheckoutLineItemsRemoveInput!) {
    checkoutLineItemsRemove(input: $input) {
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

const AppWithDataAndMutation = compose(
  graphql(shopQuery),
  graphql(createCheckout, {name: "createCheckout"}),
  graphql(checkoutLineItemsAdd, {name: "checkoutLineItemsAdd"}),
  graphql(checkoutLineItemsRemove, {name: "checkoutLineItemsRemove"})
)(App);

export default AppWithDataAndMutation;
