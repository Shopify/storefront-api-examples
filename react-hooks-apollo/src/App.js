import React, { useState, useEffect } from 'react';

import Product from './components/Product';
import Cart from './components/Cart';
import CustomerAuthWithMutation from './components/CustomerAuth';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import gql from 'graphql-tag';
import {
  createCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
} from './checkout';

function App(props){

  const [products,setProducts] = useState([]);
  const [isCartOpen,setCartOpen] = useState(false);
  const [isNewCustomer,setNewCustomer] = useState(false);
  const [isCustomerAuthOpen,setCustomerAuthOpen] = useState(false);
  const [showAccountVerificationMessage,setAccountVerificationMessage] = useState(false);
  const [checkout,setCheckout] = useState({ lineItems: { edges: [] }});

  const [shop,setShop] = useState({});
  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  useEffect(() => {
    props.createCheckout({
      variables: {
        input: {}
      }}).then((res) => {
        setCheckout( res.data.checkoutCreate.checkout );
      });

  }, []);

  const handleCartClose = () => {
    setCartOpen( false );
  };

  const openCustomerAuth = (event) => {
    if (event.target.getAttribute('data-customer-type') === "new-customer") {
      setNewCustomer( true );
      setCustomerAuthOpen( true );
    } else {
      setNewCustomer( false );
      setCustomerAuthOpen( true );
    }
  };

  const accountVerificationMessage = () => {
    setAccountVerificationMessage(true)
    setTimeout(() => {
      setAccountVerificationMessage(false)
   }, 5000);
  };

  const closeCustomerAuth = () => {
    setCustomerAuthOpen(false);
  };

  const addVariantToCart = (variantId, quantity) =>{
    props.checkoutLineItemsAdd(
      { variables: { checkoutId:checkout.id, lineItems:  [{variantId, quantity: parseInt(quantity, 10)}] }
      }).then((res) => {
      setCheckout( res.data.checkoutLineItemsAdd.checkout );
    });

    setCartOpen(true);
  };

  const updateLineItemInCart = (lineItemId, quantity) => {
    props.checkoutLineItemsUpdate(
      { variables: { checkoutId:checkout.id, lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}] }
      }).then((res) => {
      setCheckout( res.data.checkoutLineItemsUpdate.checkout );
    });
  };

  const removeLineItemInCart = (lineItemId) => {
    props.checkoutLineItemsRemove(
      { variables: { checkoutId:checkout.id, lineItemIds: [lineItemId] }
      }).then((res) => {
      setCheckout( res.data.checkoutLineItemsRemove.checkout );
    });
  };

  const associateCustomerCheckout = (customerAccessToken) => {
    props.checkoutCustomerAssociate(
      { variables: { checkoutId:checkout.id, customerAccessToken: customerAccessToken }
      }).then((res) => {
      setCheckout( res.data.checkoutLineItemsRemove.checkout );
      setCustomerAuthOpen(true);
    });
  };

  if (props.data.loading) {
    return <p>Loading ...</p>;
  }

  if (props.data.error) {
    return <p>{props.data.error.message}</p>;
  }

  return (
    <div className="App">
      <div className="Flash__message-wrapper">
        <p className={`Flash__message ${showAccountVerificationMessage ? 'Flash__message--open' : ''}`}>We have sent you an email, please click the link included to verify your email address</p>
      </div>
      <CustomerAuthWithMutation
        closeCustomerAuth={closeCustomerAuth}
        isCustomerAuthOpen={isCustomerAuthOpen}
        newCustomer={isNewCustomer}
        associateCustomerCheckout={associateCustomerCheckout}
        showAccountVerificationMessage={accountVerificationMessage}
      />
      <header className="App__header">
        <ul className="App__nav">
          <li className="button App__customer-actions" onClick={openCustomerAuth} data-customer-type="new-customer">Create an Account</li>
          <li className="login App__customer-actions" onClick={openCustomerAuth}>Log in</li>
        </ul>
        {!isCartOpen &&
          <div className="App__view-cart-wrapper">
            <button className="App__view-cart" onClick={()=> setCartOpen( true )}>Cart</button>
          </div>
        }
        <div className="App__title">
          <h1>{props.data.shop.name}: React Example</h1>
          <h2>{props.data.shop.description}</h2>
        </div>
      </header>
      <div className="Product-wrapper">
        { props.data.shop.products.edges.map(product =>
          <Product addVariantToCart={addVariantToCart} checkout={checkout} key={product.node.id.toString()} product={product.node} />
        )}
      </div>
      <Cart
        removeLineItemInCart={removeLineItemInCart}
        updateLineItemInCart={updateLineItemInCart}
        checkout={checkout}
        isCartOpen={isCartOpen}
        handleCartClose={handleCartClose}
        customerAccessToken={customerAccessToken}
      />
    </div>
  );

}

App.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    shop: PropTypes.object,
  }).isRequired,
  createCheckout: PropTypes.func.isRequired,
  checkoutLineItemsAdd: PropTypes.func.isRequired,
  checkoutLineItemsUpdate: PropTypes.func.isRequired
}

const query = gql`
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
  graphql(query),
  graphql(createCheckout, {name: "createCheckout"}),
  graphql(checkoutLineItemsAdd, {name: "checkoutLineItemsAdd"}),
  graphql(checkoutLineItemsUpdate, {name: "checkoutLineItemsUpdate"}),
  graphql(checkoutLineItemsRemove, {name: "checkoutLineItemsRemove"}),
  graphql(checkoutCustomerAssociate, {name: "checkoutCustomerAssociate"})
)(App);

export default AppWithDataAndMutation;
