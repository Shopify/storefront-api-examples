import React, { useState, useEffect } from 'react';

import Products from './components/Products';
import Cart from './components/Cart';

function App(props){

  const [products,setProducts] = useState([]);
  const [isCartOpen,setCartOpen] = useState(false);
  const [checkout,setCheckout] = useState({ lineItems: [] });
  const [shop,setShop] = useState({});

  const cartOpen = () => {
    setCartOpen( true );
  };

  useEffect(() => {
    props.client.checkout.create().then((res) => {
      setCheckout( res );
    });

    props.client.product.fetchAll().then((res) => {
      setProducts( res );
    });

    props.client.shop.fetchInfo().then((res) => {
      setShop(res);
    });

  }, []);

  const addVariantToCart = (variantId, quantity) => {

    setCartOpen( true );

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = checkout.id

    return props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      setCheckout( res );
    });
  }

  const updateQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      setCheckout( res );
    });
  }

  const removeLineItemInCart = (lineItemId) => {
    const checkoutId = checkout.id

    return props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {

      setCheckout( res );
    });
  }

  const handleCartClose = () => {

    setCartOpen( false );
  }

  return (
    <div className="App">
        <header className="App__header">
          {!isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={cartOpen}>Cart</button>
            </div>
          }
          <div className="App__title">
            <h1>{shop.name}: React Example</h1>
            <h2>{shop.description}</h2>
          </div>
        </header>
        <Products
          products={products}
          client={props.client}
          addVariantToCart={addVariantToCart}
        />
        <Cart
          checkout={checkout}
          isCartOpen={isCartOpen}
          handleCartClose={handleCartClose}
          updateQuantityInCart={updateQuantityInCart}
          removeLineItemInCart={removeLineItemInCart}
        />
      </div>
  );
}

export default App;
