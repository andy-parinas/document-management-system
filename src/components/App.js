import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import withAuthentication from './hoc/withAuthentication';


import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './dashboard/Dashboard';
import Signin from './auth/Signin';

class App extends Component {
  render() {

    return (
      <div className="App">
          <Switch>
              <Route path='/signin' component={Signin} /> 
              <Route path='/' component={Dashboard} />   
          </Switch>
      </div>
    );
  }
}

export default withAuthentication(App);
