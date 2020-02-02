import React from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CustomerAuth from './components/CustomerAuth';
import Cart from './components/Cart';
import Product from './components/Product';
import withStoreContext from './withStoreContext'

const App = (props) => {
  const {
    data: {
      shop,
      loading,
      error,
    },
    storeContext: {
      openCustomerAuth,
      setIsNewCustomer,
      showAccountVerificationMessage,
      isCartOpen,
      handleCartOpen,
    },
  } = props;

  const setCustomerTypeAndOpenAuthScreen = ({ isNewCustomer }) => {
    setIsNewCustomer(isNewCustomer);
    openCustomerAuth();
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="App">
      {showAccountVerificationMessage
        && (
          <div className="Flash__message-wrapper">
            <p className={`Flash__message Flash__message--open`}>
              We have sent you an email, please click the link included to verify your email address
            </p>
          </div>
        )}

      <CustomerAuth />

      <header className="App__header">
        <ul className="App__nav">
          <li
            className="button App__customer-actions"
            onClick={() => setCustomerTypeAndOpenAuthScreen({ isNewCustomer: true })}
          >
            Create an Account
          </li>
          <li
            className="login App__customer-actions"
            onClick={() => setCustomerTypeAndOpenAuthScreen({ isNewCustomer: false })}
          >
            Log in
          </li>
        </ul>

        {!isCartOpen
          && (
            <div className="App__view-cart-wrapper">
              <button
                className="App__view-cart"
                onClick={handleCartOpen}
              >
                Cart
              </button>
            </div>
          )}

        <div className="App__title">
          <h1>{shop.name}: React Example</h1>
          <h2>{shop.description}</h2>
        </div>
      </header>

      <div className="Product-wrapper">
        {(shop.products.edges && shop.products.edges.length > 0) && shop.products.edges.map(product => (
          <Product
            key={product.node.id.toString()}
            product={product.node}
          />
        ))}
      </div>

      <Cart />
    </div>
  );
}

// could migrate this into the provider? something could be done to abstract this out I think...
// or maybe create a product setter method on the provider so we could set them or update them somehow
const loadProductsQuery = gql`
  query query {
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
              id
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

const AppWithDataAndMutation = compose(
	graphql(loadProductsQuery),
)(App);

App.propTypes = {
  storeContext: PropTypes.shape({
    openCustomerAuth: PropTypes.func,
    setIsNewCustomer: PropTypes.func,
  }).isRequired,
}

export default withStoreContext(AppWithDataAndMutation);
