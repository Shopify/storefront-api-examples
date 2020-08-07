import React, { useEffect } from "react"
import LineItem from "./LineItem"
import { useShopify } from "../hooks"
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md"

export default (props) => {
	const {
		cartStatus,
		closeCart,
		openCart,
		checkoutState,
		setCount,
	} = useShopify()

	function handleOpen(e) {
		e.preventDefault()
		openCart()
	}

	function handleClose(e) {
		e.preventDefault()
		closeCart()
	}

	function openCheckout(e) {
		e.preventDefault()
		// window.open(checkoutState.webUrl) // opens checkout in a new window
		window.location.replace(checkoutState.webUrl) // opens checkout in same window
	}

	useEffect(() => {
		const button = document.querySelector("button.App__view-cart")
		if (cartStatus === true) {
			button.classList.add("hide")
		} else {
			button.classList.remove("hide")
		}

		function getCount() {
			let lineItems =
				checkoutState.lineItems && checkoutState.lineItems.length > 0
					? checkoutState.lineItems
					: []
			let count = 0
			lineItems.forEach((item) => {
				count += item.quantity
				return count
			})

			setCount(count)
		}

		getCount()
	}, [cartStatus, checkoutState])

	return (
		<div id="cart">
			<div className={`Cart ${cartStatus ? "Cart--open" : ""}`}>
				<div className="App__view-cart-wrapper2">
					<button className="App__view-cart" onClick={(e) => handleOpen(e)}>
						<MdShoppingCart />
					</button>
				</div>
				<header className="Cart__header">
					<h2>Your cart</h2>
					<button className="Cart__close" onClick={(e) => handleClose(e)}>
						<MdRemoveShoppingCart />
					</button>
				</header>
				<ul className="Cart__line-items">
					<LineItem />
				</ul>
				<footer className="Cart__footer">
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Subtotal</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkoutState.subtotalPrice}</span>
						</div>
					</div>
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Taxes</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkoutState.totalTax}</span>
						</div>
					</div>
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Total</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkoutState.totalPrice}</span>
						</div>
					</div>
					<button
						className="Cart__checkout button"
						onClick={(e) => openCheckout(e)}
					>
						Checkout
					</button>
				</footer>
			</div>
		</div>
	)
}
