import React from 'react';

import LineItem from './LineItem';

function Cart(props){

  const openCheckout = () => {
    window.open(props.checkout.webUrl);
  }

  let line_items = props.checkout.lineItems.edges.map((line_item) => {
    return (
      <LineItem
        removeLineItemInCart={props.removeLineItemInCart}
        updateLineItemInCart={props.updateLineItemInCart}
        key={line_item.node.id.toString()}
        line_item={line_item.node}
      />
    );
  });

  return (
    <div className={`Cart ${props.isCartOpen ? 'Cart--open' : ''}`}>
      <header className="Cart__header">
        <h2>Your cart</h2>
        <button
          onClick={props.handleCartClose}
          className="Cart__close">
          ×
        </button>
      </header>
      <ul className="Cart__line-items">
        {line_items}
      </ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {props.checkout.subtotalPrice}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Taxes</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {props.checkout.totalTax}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Total</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {props.checkout.totalPrice}</span>
          </div>
        </div>
        <button className="Cart__checkout button" onClick={openCheckout}>Checkout</button>
      </footer>
    </div>
  )
}

export default Cart;
