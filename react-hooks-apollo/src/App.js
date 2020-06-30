import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Product from './components/Product';
import Cart from './components/Cart';
import CustomerAuthWithMutation from './components/CustomerAuth';
import gql from 'graphql-tag';
import {
  useCheckoutEffect,
  createCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
} from './checkout';

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

function App(props){

  const [isCartOpen,setCartOpen] = useState(false);
  const [isNewCustomer,setNewCustomer] = useState(false);
  const [isCustomerAuthOpen,setCustomerAuthOpen] = useState(false);
  const [showAccountVerificationMessage,setAccountVerificationMessage] = useState(false);
  const [checkout,setCheckout] = useState({ lineItems: { edges: [] }});

  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  const [createCheckoutMutation,
  {
    data: createCheckoutData,
    loading: createCheckoutLoading,
    error: createCheckoutError
  }] = useMutation(createCheckout);

  const [lineItemAddMutation,
  {
    data: lineItemAddData,
    loading: lineItemAddLoading,
    error: lineItemAddError
  }] = useMutation(checkoutLineItemsAdd);

  const [lineItemUpdateMutation,
  {
    data: lineItemUpdateData,
    loading: lineItemUpdateLoading,
    error: lineItemUpdateError
  }] = useMutation(checkoutLineItemsUpdate);

  const [lineItemRemoveMutation,
  {
    data: lineItemRemoveData,
    loading: lineItemRemoveLoading,
    error: lineItemRemoveError
  }] = useMutation(checkoutLineItemsRemove);

  const [customerAssociateMutation,
  {
    data: customerAssociateData,
    loading: customerAssociateLoading,
    error: customerAssociateError
  }] = useMutation(checkoutCustomerAssociate);

  const { loading:shopLoading, error:shopError, data:shopData } = useQuery(query);

  useEffect(() => {
    const variables = { input: {} };
    createCheckoutMutation({ variables }).then(
      res => {
        console.log( res );
      },
      err => {
        console.log('create checkout error', err );
      }
    );

  }, []);

  useCheckoutEffect(createCheckoutData, 'checkoutCreate', setCheckout);
  useCheckoutEffect(lineItemAddData, 'checkoutLineItemsAdd', setCheckout);
  useCheckoutEffect(lineItemUpdateData, 'checkoutLineItemsUpdate', setCheckout);
  useCheckoutEffect(lineItemRemoveData, 'checkoutLineItemsRemove', setCheckout);
  useCheckoutEffect(customerAssociateData, 'checkoutCustomerAssociate', setCheckout);

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
    const variables = { checkoutId:checkout.id, lineItems:  [{variantId, quantity: parseInt(quantity, 10)}] };
    // TODO replace for each mutation in the checkout thingy. can we export them from there???
    // create your own custom hook???

    lineItemAddMutation({ variables }).then(res => {
        setCartOpen(true);
    });
  };

  const updateLineItemInCart = (lineItemId, quantity) => {
    const variables = { checkoutId:checkout.id, lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}] };
    lineItemUpdateMutation({ variables });
  };

  const removeLineItemInCart = (lineItemId) => {
    const variables = { checkoutId:checkout.id, lineItemIds: [lineItemId] };
    lineItemRemoveMutation({ variables });
  };

  const associateCustomerCheckout = (customerAccessToken) => {

    const variables = { checkoutId:checkout.id, customerAccessToken: customerAccessToken };
    customerAssociateMutation({ variables }).then((res) => {
      setCustomerAuthOpen(false);
    });
  };

  if (shopLoading) {
    return <p>Loading ...</p>;
  }

  if (shopError) {
    return <p>{shopError.message}</p>;
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
          <h1>{shopData.shop.name}: React Example</h1>
          <h2>{shopData.shop.description}</h2>
        </div>
      </header>
      <div className="Product-wrapper">
        { shopData.shop.products.edges.map(product =>
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

export default App;
