import React, {Component} from 'react';
import LineItem from './LineItem';
import '../css/Cart.css';

class Cart extends Component {

  render() {
    let line_items = this.props.checkout.lineItems.map((line_item) => {
      return (
        <LineItem removeVariantFromCart={this.props.removeVariantFromCart} key={line_item.id.toString()} line_item={line_item} />
      );
    });

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
          {line_items}
          <li className="Line-item">
            <strong>Subtotal: </strong>
            $ {this.props.checkout.subtotalPrice}
          </li>
          <li className="Line-item">
            <label>
              <strong>Taxes: </strong>
              $ {this.props.checkout.totalTax}
            </label>
          </li>
          <li className="Line-item">
            <strong>Total: </strong>
            $ {this.props.checkout.totalPrice}
          </li>
        </ul>
        <footer className="Cart__footer">
          <button className="Cart__checkout button">Checkout</button>
        </footer>
      </div>
    )
  }
}

export default Cart;
