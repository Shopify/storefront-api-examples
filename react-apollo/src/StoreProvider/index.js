import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';

import StoreContext from './context';
import {
	createCheckout,
	customerCreate,
	customerRecover,
	customerReset,
	customerAccessTokenCreate,
	customerAccessTokenDelete,
	checkoutLineItemsAdd,
	checkoutLineItemsUpdate,
	checkoutLineItemsRemove,
	checkoutCustomerAssociate,
	customerUpdateInformation,
} from './mutations';

class StoreProvider extends Component {
	constructor() {
		super();

		this.state = {
			isCartOpen: false,
			isCustomerAuthOpen: false,
			isNewCustomer: false,
			accessToken: null,
			showAccountVerificationMessage: false,
			checkout: null,
			authErrors: {},
		};
	}

	componentDidMount() {
		const { checkout } = this.state;
		if (checkout === null) this.createCheckout();
	}

	createCheckout = () => {
		const { createCheckoutMutation } = this.props;

		createCheckoutMutation({
			variables: {
				input: {},
			},
		}).then((res) => {
			this.setState({ checkout: res.data.checkoutCreate.checkout });
    });
	}

  handleCartOpen = () => { this.setState({ isCartOpen: true }); }

  handleCartClose = () => { this.setState({ isCartOpen: false }); }

  openCustomerAuth = () => { this.setState({ isCustomerAuthOpen: true }); }

  closeCustomerAuth = () => { this.setState({ isCustomerAuthOpen: false }); }

  setAccessToken = ({ accessToken }) => { this.setState({ accessToken }); }

	removeAccessToken = () => {
		const { customerAccessTokenDeleteMutation } = this.props;
		const { accessToken } = this.state;

		customerAccessTokenDeleteMutation({
			variables: {
				customerAccessToken: accessToken,
			},
		});

		this.setState({ accessToken: null });
	}

  setIsNewCustomer = (bool) => { this.setState({ isNewCustomer: bool }); }

  showAccountVerificationMessage = () => {
    this.setState({ showAccountVerificationMessage: true });

    setTimeout(() => {
      this.setState({ showAccountVerificationMessage: false });
    }, 5000);
  }

  setLoginStatus = (bool) => { this.setState({ isLoggedIn: bool }); }

  setAuthErrors = (errors) => {
		const errorKeyValuePairs = errors && errors.reduce((messageAcc, error) => {
			const {
				field: fields,
				message,
			} = error;

			const fieldSpecificErrors = fields && fields.reduce((fieldTypeAcc, fieldName) => ({
				...fieldTypeAcc,
				[`${fieldName}ErrorMessage`]: message,
			}), []);

			// error was not attached to a field, more generic
			if (!fields) {
				return {
					...messageAcc,
					genericErrorMessage: message,
				};
			}

			return {
				...messageAcc,
				...fieldSpecificErrors,
			};
		}, []);

		this.setState({ authErrors: errorKeyValuePairs });
	}

  redirectToWebCheckout = () => {
  	const { checkout } = this.state;
  	window.open(checkout.webUrl);
  }

	addVariantToCart = (variantId, quantity) => {
		const { checkoutLineItemsAddMutation } = this.props;
		const { checkout } = this.state;

		checkoutLineItemsAddMutation({
			variables: {
				checkoutId: checkout.id,
				lineItems: [{
					variantId,
					quantity: parseInt(quantity, 10),
				}],
			},
		}).then((res) => {
			this.setState({ checkout: res.data.checkoutLineItemsAdd.checkout });
		});
  }

  removeLineItemInCart = (lineItemId) => {
		const { checkoutLineItemsRemoveMutation } = this.props;
		const { checkout } = this.state;

		checkoutLineItemsRemoveMutation({
			variables: {
				checkoutId: checkout.id,
				lineItemIds: [lineItemId],
				quantity: 1,
			},
		}).then((res) => {
			this.setState({ checkout: res.data.checkoutLineItemsRemove.checkout });
		});
	}

	updateLineItemInCart = (lineItemId, quantity) => {
		const { checkoutLineItemsUpdateMutation } = this.props;
		const { checkout } = this.state;

		checkoutLineItemsUpdateMutation({
			variables: {
				checkoutId: checkout.id,
				lineItems: [{
					id: lineItemId,
					quantity: parseInt(quantity, 10),
				}],
			},
		}).then((res) => {
			this.setState({ checkout: res.data.checkoutLineItemsUpdate.checkout });
		});
	}

	createCustomerAccount = (email, password) => {
		const { customerCreateMutation } = this.props;

		const input = {
			email,
			password,
		};

		customerCreateMutation({
			variables: { input },
		}).then((res) => {
			if (res.data.customerCreate.customer) {
				this.loginCustomerAccount(email, password);
				this.closeCustomerAuth();
				this.showAccountVerificationMessage();
			} else {
        this.setAuthErrors(res.data.customerCreate.userErrors);
			}
		});
	}

	associateCustomerCheckout = (customerAccessToken) => {
		const { checkoutCustomerAssociateMutation } = this.props;
		const { checkout } = this.state;

		checkoutCustomerAssociateMutation({
			variables: { checkoutId: checkout.id, customerAccessToken },
		}).then((res) => {
			this.setState({ checkout: res.data.checkoutCustomerAssociate.checkout });
		});
	}

	loginCustomerAccount = (email, password) => {
		const { customerAccessTokenCreateMutation } = this.props;

		const input = {
			email,
			password,
		};

		customerAccessTokenCreateMutation({
			variables: { input },
		}).then((res) => {
			if (res.data.customerAccessTokenCreate.customerAccessToken) {
				this.associateCustomerCheckout(res.data.customerAccessTokenCreate.customerAccessToken.accessToken);
				this.setLoginStatus(true);
				this.setAccessToken(res.data.customerAccessTokenCreate.customerAccessToken);
			} else {
        this.setAuthErrors(res.data.customerAccessTokenCreate.userErrors);
			}
		});
	}

	logoutCustomerAccount = () => {
		this.removeAccessToken();
		this.setLoginStatus(false);
		this.createCheckout();
	}

	render() {
		const { children } = this.props;
    const {
      authErrors,
      isLoggedIn,
      checkout,
      accessToken,
      isCartOpen,
      isCustomerAuthOpen,
      isNewCustomer,
      showAccountVerificationMessage
    } = this.state;

		const storeContext = {
			storeContext: {
        setIsNewCustomer: this.setIsNewCustomer,
				createCustomerAccount: this.createCustomerAccount,
				loginCustomerAccount: this.loginCustomerAccount,
				logoutCustomerAccount: this.logoutCustomerAccount,
				customerRecover: this.customerRecover,
				customerReset: this.customerReset,
				addVariantToCart: this.addVariantToCart,
				removeLineItemInCart: this.removeLineItemInCart,
				updateLineItemInCart: this.updateLineItemInCart,
				openCustomerAuth: this.openCustomerAuth,
        closeCustomerAuth: this.closeCustomerAuth,
        handleCartOpen: this.handleCartOpen,
        handleCartClose: this.handleCartClose,
				isCartOpen,
				authErrors,
				isLoggedIn,
				checkout,
				accessToken,
				isCustomerAuthOpen,
				isNewCustomer,
				showAccountVerificationMessage,
			},
		};

		return (
			<StoreContext.Provider value={storeContext}>
				{children}
			</StoreContext.Provider>
		);
	}
}


const StoreProviderWithMutations = compose(
	graphql(customerCreate, { name: 'customerCreateMutation' }),
	graphql(customerRecover, { name: 'customerRecoverMutation' }),
	graphql(customerReset, { name: 'customerResetMutation' }),
	graphql(customerAccessTokenCreate, { name: 'customerAccessTokenCreateMutation' }),
	graphql(customerAccessTokenDelete, { name: 'customerAccessTokenDeleteMutation' }),
	graphql(createCheckout, { name: 'createCheckoutMutation' }),
	graphql(checkoutLineItemsAdd, { name: 'checkoutLineItemsAddMutation' }),
	graphql(checkoutLineItemsUpdate, { name: 'checkoutLineItemsUpdateMutation' }),
	graphql(checkoutLineItemsRemove, { name: 'checkoutLineItemsRemoveMutation' }),
	graphql(checkoutCustomerAssociate, { name: 'checkoutCustomerAssociateMutation' }),
	graphql(customerUpdateInformation, { name: 'customerUpdateInformationMutation' }),
)(StoreProvider);


export default StoreProviderWithMutations;
