// frontend/src/components/auth/LoginForm.js

import React, { Component } from 'react';
import Link from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions/auth';
import "./../../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

class LoginForm extends Component {
  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="form-outline mb-4">
        <div className={`field ${touched && error ? 'error' : ''}`}>
          <label className='form-label'>{label}</label>
          <input className='form-control' {...input} type={type} />
          {touched && error && (
            <span className='ui pointing red basic label'>{error}</span>
          )}
        </div>
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className='field'>
        <input type={type} />
        {error && <div className='ui red message'>{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    debugger;
    this.props.login(formValues);
  };

  render() {
    // debugger;
    if (this.props.isAuthenticated) {
      // debugger;
      return (<Navigate to='/' replace={true} />);
    }
    return (
      <div className='ui container'>
        <div className='ui segment'>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form'
            style={{width: "22rem"}}
          >
            <Field
              name='username'
              type='text'
              component={this.renderField}
              label='Username'
            />
            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
            />
            <Field
              name='non_field_errors'
              type='hidden'
              component={this.hiddenField}
            />
            <button className='btn btn-primary btn-block mb-4'>Login</button>
          </form>
          {/* <p style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to='/register'>Register</Link>
          </p> */}
        </div>
      </div>
      //   <div className="Auth-form-container">
      //   <form className="Auth-form">
      //     <div className="Auth-form-content">
      //       <h3 className="Auth-form-title">Sign In</h3>
      //       <div className="form-group mt-3">
      //         <label>Username</label>
      //         <input
      //           type="username"
      //           className="form-control mt-1"
      //           placeholder="Enter username"
      //         />
      //       </div>
      //       <div className="form-group mt-3">
      //         <label>Password</label>
      //         <input
      //           type="password"
      //           className="form-control mt-1"
      //           placeholder="Enter password"
      //         />
      //       </div>
      //       <div className="d-grid gap-2 mt-3">
      //         <button type="submit" onClick={this.onSubmit} className="btn btn-primary">
      //           Submit
      //         </button>
      //       </div>
      //     </div>
      //   </form>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: 'loginForm'
})(LoginForm);