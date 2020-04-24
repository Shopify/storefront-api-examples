import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStoreContext from '../withStoreContext';

class CustomerAuth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			genericErrorMessage: null,
			emailErrorMessage: null,
			passwordErrorMessage: null,
		};
	}

	handleInputChange = (event) => {
		const {
			target: {
				value,
				name,
			},
		} = event;
		this.setState({ [name]: value });
	}

	resetErrorMessages = () => {
  	this.setState({
  		genericErrorMessage: null,
  		emailErrorMessage: null,
  		passwordErrorMessage: null,
  	});
	}

	resetInputFields = () => {
  	this.setState({
  		email: '',
  		password: '',
  	});
	}

	handleSubmit = (email, password) => {
		const {
			storeContext: {
				createCustomerAccount,
				loginCustomerAccount,
				isNewCustomer,
			},
		} = this.props;

  	this.resetErrorMessages();
  	if (isNewCustomer) createCustomerAccount(email, password);
		else loginCustomerAccount(email, password);
	}

  handleCloseCustomerAuth = () => {
  	const {
  		storeContext: {
  			closeCustomerAuth,
  		},
  	} = this.props;

  	closeCustomerAuth();
  	this.resetErrorMessages();
  	this.resetInputFields();
  }

  render() {
  	const {
  		storeContext: {
        isCustomerAuthOpen,
  			isNewCustomer,
        authErrors,
  		},
    } = this.props;
  	const {
  		email,
  		password,
    } = this.state;

  	return (
    <div className={`CustomerAuth ${isCustomerAuthOpen ? 'CustomerAuth--open' : ''}`}>
		  <button
        onClick={this.handleCloseCustomerAuth}
        className="CustomerAuth__close"
      >
	      ×
      </button>

      <div className="CustomerAuth__body">
	      <h2 className="CustomerAuth__heading">{isNewCustomer ? 'Create your Account' : 'Log in to your account'}</h2>
	      {authErrors.genericErrorMessage && <div className="error">{authErrors.genericErrorMessage}</div> }
	      <label className="CustomerAuth__credential">
	        <input
            className="CustomerAuth__input"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
	        {authErrors.emailErrorMessage && <div className="error">{authErrors.emailErrorMessage}</div>}
        </label>

        <label className="CustomerAuth__credential">
          <input
            className="CustomerAuth__input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
          {authErrors.passwordErrorMessage && <div className="error">{authErrors.passwordErrorMessage}</div>}
        </label>

        <button
          className="CustomerAuth__submit button"
          type="submit"
          onClick={() => this.handleSubmit(email, password)}
        >
          {isNewCustomer ? 'Create Account' : 'Log in'}
        </button>
      </div>
    </div>
  	);
  }
}

CustomerAuth.propTypes = {
  storeContext: PropTypes.shape({
    createCustomerAccount: PropTypes.func,
    loginCustomerAccount: PropTypes.func,
    closeCustomerAuth: PropTypes.func,
    isNewCustomer: PropTypes.bool,
    isCustomerAuthOpen: PropTypes.bool,
    authErrors: PropTypes.shape({}),
  }).isRequired,
}

export default withStoreContext(CustomerAuth);
