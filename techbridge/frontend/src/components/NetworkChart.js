import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getNetwork } from '../actions/network';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import store from "../store.js";
import { loadUser } from '../actions/auth'; // added
import { Field, reduxForm } from 'redux-form';
import UiComponent from './UiComponent.js';
// import { render } from 'react-dom';

export class NetworkChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: true
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    };

    axios.get('/data', config).then(response => {
      this.setState({ data: response.data, errors: false }); 
    })
  }
  
  render() {
    // debugger;
    if(this.state.errors) {
      return <div style={{color: "red"}}>Please login</div>
    } else {
      return <UiComponent data={this.state.data} />
    }
  }
}

// const mapStateToProps = state => ({
//   token: state.auth.token
// });

// NetworkChart = connect(
//   mapStateToProps,
//   { loadUser }
// )(NetworkChart);

// export default reduxForm({
//   form: 'NetworkChart'
// })(NetworkChart);