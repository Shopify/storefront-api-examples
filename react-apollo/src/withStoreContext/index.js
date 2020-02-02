import React from 'react';
import StoreContext from '../StoreProvider/context';

const withStoreContext = (PassedComponent) => {
	const StoreContextWrap = props => (
		<StoreContext.Consumer>
			{(context) => {
				return (
					<PassedComponent
						{...{
							...props,
							...context,
						}}
					/>
				);
			}}
		</StoreContext.Consumer>
	);
	return StoreContextWrap;
};

export default withStoreContext;
