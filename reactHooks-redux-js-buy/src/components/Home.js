import React from "react"
import { useShopify } from "../hooks"

export default (props) => {
	const { shopDetails } = useShopify()

	return (
		<div>
			<header className="App__header">
				<div className="App__title">
					<h1>{shopDetails.name}: React / Redux Example</h1>
					<h2>{shopDetails.description}</h2>
				</div>
			</header>
		</div>
	)
}
