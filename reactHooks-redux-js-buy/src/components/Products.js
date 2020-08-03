import React, { useEffect } from "react"
import Product from "./Product"
import { useShopify } from "../hooks"

export default (props) => {
	const { fetchProducts } = useShopify()

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div className="Products-wrapper">
			<Product history={props.history} />
		</div>
	)
}
