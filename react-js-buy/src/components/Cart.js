import React, {Component} from 'react';
import LineItem from './LineItem';
import '../css/Cart.css';

class Cart extends Component {
  render() {
    return (
      <div className={`Cart ${this.props.isCartOpen ? 'Cart--open' : ''}`}>
        <header className="Cart__header">
          <h2>Cart</h2>
          <button
            onClick={this.props.handleCartClose}
            className="Cart__close">
            x
          </button>
        </header>
        <ul className="Cart__line-items">
          <LineItem />
          <LineItem />
        </ul>
        <footer className="Cart__footer">
          <button className="Cart__checkout button">Checkout</button>
        </footer>
      </div>
    )
  }
}

export default Cart;
