import React from "react"
import Product from "./Product"

export default (props) => {
	return (
		<div className="Products-wrapper">
			<Product history={props.history} />
		</div>
	)
}
