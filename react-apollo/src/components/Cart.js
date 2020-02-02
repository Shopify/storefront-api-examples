import React from 'react';
import PropTypes from 'prop-types';
import LineItem from './LineItem';

import withStoreContext from '../providers/withStoreContext';

const Cart  = (props) => {
  const {
    storeContext: {
      checkout,
      redirectToWebCheckout,
      isCartOpen,
      handleCartClose,
    }
  } = props;

  return (
    <div className={`Cart ${isCartOpen ? 'Cart--open' : ''}`}>
				<header className="Cart__header">
					<h2>Cart</h2>
					<button
						onClick={handleCartClose}
						className="Cart__close"
					>
						×
					</button>
				</header>
				<ul className="Cart__line-items">
          {(checkout && checkout.lineItems.edges && checkout.lineItems.edges.length > 0) && checkout.lineItems.edges.map(lineItem => {
            return (
              <LineItem
                key={lineItem.node.id.toString()}
                line_item={lineItem.node}
              />
            );
          })}
				</ul>

				<footer className="Cart__footer">
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Subtotal</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkout && checkout.subtotalPrice}</span>
						</div>
					</div>
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Taxes</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkout && checkout.totalTax}</span>
						</div>
					</div>
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Total</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkout && checkout.totalPrice}</span>
						</div>
					</div>
					<button
						className="Cart__checkout button"
            onClick={redirectToWebCheckout}
            type="button"
					>
            Checkout
					</button>
				</footer>
			</div>
  )
};

Cart.propTypes = {
	storeContext: PropTypes.shape({
    checkout: PropTypes.shape({}),
    isCartOpen: PropTypes.bool,
    handleCartClose: PropTypes.func,
    redirectToWebCheckout: PropTypes.string,
	}).isRequired,
};

export default withStoreContext(Cart);
