import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

function CustomerAuth(props){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [nonFieldErrorMessage,setNonFieldErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const resetInputFields = () => {
    setPassword('');
    setEmail('');
  };

  const resetErrorMessages = () => {
    setNonFieldErrorMessage( null );
    setEmailErrorMessage( null );
    setPasswordErrorMessage( null );
  };

  const handleSubmit = () => {
    resetErrorMessages();
    if (props.newCustomer) {
      createCustomerAccount(email, password)
    } else {
      loginCustomerAccount(email, password)
    }
  };

  const createCustomerAccount = (email, password) => {
    const input = {
      email: email,
      password: password
    }
    props.customerCreate(
      { variables: { input }
      }).then((res) => {
        if (res.data.customerCreate.customer){
           props.closeCustomerAuth();
           props.showAccountVerificationMessage();
        } else {
          res.data.customerCreate.userErrors.forEach(function (error) {
            if (error.field && error.field === 'email') {
              setEmailErrorMessage( error.message );
            } else if (error.field && error.field === 'password') {
              setPasswordErrorMessage( error.message );
            } else {
              setNonFieldErrorMessage( error.message );
            }
          });
        }
    });
  }

  const loginCustomerAccount = (email, password) => {
    const input = {
      email: email,
      password: password
    }
    props.customerAccessTokenCreate(
      { variables: { input }
      }).then((res) => {
      if (res.data.customerAccessTokenCreate.customerAccessToken) {
        props.associateCustomerCheckout(res.data.customerAccessTokenCreate.customerAccessToken.accessToken);
      } else {
        res.data.customerAccessTokenCreate.userErrors.forEach(function (error) {
          if (error.field && error.field === 'email') {
            setEmailErrorMessage( error.message );
          } else if (error.field && error.field === 'password') {
            setPasswordErrorMessage( error.message );
          } else {
            setNonFieldErrorMessage( error.message );
          }
        });
      }
    });
  }

  return (
    <div className={`CustomerAuth ${props.isCustomerAuthOpen ? 'CustomerAuth--open' : ''}`}>
      <button
        onClick={() => { props.closeCustomerAuth(); resetErrorMessages(); resetInputFields();}}
        className="CustomerAuth__close">
        ×
      </button>
      <div className="CustomerAuth__body">
        <h2 className="CustomerAuth__heading">{props.newCustomer ? 'Create your Account' : 'Log in to your account'}</h2>
        {nonFieldErrorMessage &&
          <div className="error">{nonFieldErrorMessage}</div>
        }
        <label className="CustomerAuth__credential">
          <input className="CustomerAuth__input" type="email" placeholder="Email" name={"email"} value={email} onChange={(event)=>{setEmail(event.target.value)}}></input>
          {emailErrorMessage &&
            <div className="error">{emailErrorMessage}</div>
          }
        </label>
        <label className="CustomerAuth__credential">
          <input className="CustomerAuth__input" type="password" placeholder="Password" name={"password"} value={password} onChange={(event)=>setPassword(event.target.value)}></input>
          {passwordErrorMessage &&
            <div className="error">{passwordErrorMessage}</div>
          }
        </label>
        <button className="CustomerAuth__submit button" type="submit" onClick={handleSubmit}>{props.newCustomer ? 'Create Account' : 'Log in'}</button>
      </div>
    </div>

  )
}

CustomerAuth.propTypes = {
  customerCreate: PropTypes.func.isRequired,
  customerAccessTokenCreate: PropTypes.func.isRequired,
};

const customerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
      }
    }
  }
`;

const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

const CustomerAuthWithMutation = compose(
  graphql(customerCreate, {name: "customerCreate"}),
  graphql(customerAccessTokenCreate, {name: "customerAccessTokenCreate"})
)(CustomerAuth);

export default CustomerAuthWithMutation;
