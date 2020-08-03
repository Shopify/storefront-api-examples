import React from "react"
import { useShopify } from "../hooks"

export default (props) => {
	const { checkoutState, updateQuantity, removeLineItem } = useShopify()

	function decrementQuantity(lineItemId, lineItemQuantity, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		const updatedQuantity = lineItemQuantity - 1
		updateQuantity(lineItemId, updatedQuantity, checkoutId)
	}

	function incrementQuantity(lineItemId, lineItemQuantity, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		const updatedQuantity = lineItemQuantity + 1
		updateQuantity(lineItemId, updatedQuantity, checkoutId)
	}

	function deleteLineItem(lineItemId, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		removeLineItem(checkoutId, lineItemId)
	}

	return (
		<li className="Line-item">
			{checkoutState.lineItems &&
				checkoutState.lineItems.map((lineItem, i) => {
					return (
						<div key={`${lineItem.title}` + i} className="lineItemDiv">
							<div className="Line-item__img">
								{lineItem.variant.image ? (
									<img
										src={lineItem.variant.image.src}
										alt={`${lineItem.title} product shot`}
									/>
								) : null}
							</div>
							<div className="Line-item__content">
								<div className="Line-item__content-row">
									<div className="Line-item__variant-title">
										{lineItem.variant.title}
									</div>
									<span className="Line-item__title">{lineItem.title}</span>
								</div>
								<div className="Line-item__content-row">
									<div className="Line-item__quantity-container">
										<button
											className="Line-item__quantity-update"
											onClick={(e) =>
												decrementQuantity(lineItem.id, lineItem.quantity, e)
											}
										>
											-
										</button>
										<span className="Line-item__quantity">
											{lineItem.quantity}
										</span>
										<button
											className="Line-item__quantity-update"
											onClick={(e) => {
												incrementQuantity(lineItem.id, lineItem.quantity, e)
											}}
										>
											+
										</button>
									</div>
									<span className="Line-item__price">
										$ {(lineItem.quantity * lineItem.variant.price).toFixed(2)}
									</span>
									<button
										className="Line-item__remove"
										onClick={(e) => deleteLineItem(lineItem.id, e)}
									>
										×
									</button>
								</div>
							</div>
						</div>
					)
				})}
		</li>
	)
}
