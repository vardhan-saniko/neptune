import LoginForm from './auth/LoginForm'; // added
import { NetworkChart } from './NetworkChart';
import PrivateRoute from './common/PrivateRoute'; // added

import { loadUser } from '../actions/auth'; // added

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import store from "../store.js";

import {
  Router,
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";


class App extends Component {
  // added
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Routes>
              <Route exact path='/' element={<NetworkChart />} />
              <Route exact path='/login' element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));