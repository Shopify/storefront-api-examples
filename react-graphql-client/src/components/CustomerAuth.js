import React, {Component} from 'react';
import {client} from './../config';
import '../css/CustomerAuth.css';

// const customerCreate = gql(client)`
//   mutation customerCreate($input: CustomerCreateInput!) {
//     customerCreate(input: $input) {
//       userErrors {
//         field
//         message
//       }
//       customer {
//         id
//       }
//     }
//   }
// `;
//
// const customerAccessTokenCreate = gql(client)`
//   mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
//     customerAccessTokenCreate(input: $input) {
//       userErrors {
//         field
//         message
//       }
//       customerAccessToken {
//         accessToken
//         expiresAt
//       }
//     }
//   }
// `;

class CustomerAuth extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: '',
  //     nonFieldErrorMessage: null,
  //     emailErrorMessage: null,
  //     passwordErrorMessage: null
  //   };
  //
  //   this.handleInputChange = this.handleInputChange.bind(this);
  //   this.createCustomerAccount = this.createCustomerAccount.bind(this);
  // }
  //
  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //
  //   this.setState({[name]: value});
  // }
  //
  // handleSubmit(email, password){
  //   this.setState({
  //     nonFieldErrorMessage: null,
  //     emailErrorMessage: null,
  //     passwordErrorMessage: null
  //   });
  //
  //   if (this.props.newCustomer) {
  //     this.createCustomerAccount(email, password)
  //   } else {
  //     this.loginCustomerAccount(email, password)
  //   }
  // }
  //
  // createCustomerAccount(email, password){
  //   const input = {
  //     email: email,
  //     password: password
  //   }
  //   client.send(customerCreate, input).then((res) => {
  //       res.model.customerCreate.userErrors.forEach(function (error) {
  //         if (error.field != null) {
  //           this.setState({
  //             [error.field + "ErrorMessage"]: error.message
  //           });
  //         } else {
  //           this.setState({
  //             nonFieldErrorMessage: error.message
  //           });
  //         }
  //       }.bind(this));
  //   });
  // }
  //
  // loginCustomerAccount(email, password){
  //   const input = {
  //     email: email,
  //     password: password
  //   }
  //   client.send(customerAccessTokenCreate, input).then((res) => {
  //     if (res.model.customerAccessTokenCreate.customerAccessToken != null) {
  //       this.props.setCustomerAccessToken(res.model.customerAccessTokenCreate.customerAccessToken.accessToken);
  //     } else {
  //       res.model.customerAccessTokenCreate.userErrors.forEach(function (error) {
  //         if (error.field != null) {
  //           this.setState({
  //             [error.field + "ErrorMessage"]: error.message
  //           });
  //         } else {
  //           this.setState({
  //             nonFieldErrorMessage: error.message
  //           });
  //         }
  //       }.bind(this));
  //     }
  //   });
  // }
  //
  render() {
    return (
      <h1>Test</h1>
  //     <div className={`CustomerAuth ${this.props.isCustomerAuthOpen ? 'CustomerAuth--open' : ''}`}>
  //       <button
  //         onClick={this.props.closeCustomerAuth}
  //         className="CustomerAuth__close">
  //         x
  //       </button>
  //       <div className="CustomerAuth__body">
  //         <h2 className="CustomerAuth__heading">{this.props.newCustomer ? 'Create your Account' : 'Log in to your account'}</h2>
  //         {this.state.nonFieldErrorMessage &&
  //           <div className="error">{this.state.nonFieldErrorMessage}</div>
  //         }
  //         <label className="CustomerAuth__credential">
  //           <input className="CustomerAuth__input" type="email" placeholder="Email" name={"email"} value={this.state.email} onChange={this.handleInputChange}></input>
  //           {this.state.emailErrorMessage &&
  //             <div className="error">{this.state.emailErrorMessage}</div>
  //           }
  //         </label>
          // <label className="CustomerAuth__credential">
  //           <input className="CustomerAuth__input" type="password" placeholder="Password" name={"password"} value={this.state.password} onChange={this.handleInputChange}></input>
  //           {this.state.passwordErrorMessage &&
  //             <div className="error">{this.state.passwordErrorMessage}</div>
  //           }
          // </label>
  //         <button className="CustomerAuth__submit button" type="submit" onClick={() => this.handleSubmit(this.state.email, this.state.password)}>{this.props.newCustomer ? 'Create Account' : 'Log in'}</button>
  //       </div>
  //     </div>
  //
    )
  }
}

export default CustomerAuth;
