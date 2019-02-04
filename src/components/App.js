import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './dashboard/Dashboard';

class App extends Component {
  render() {

    return (
      <div className="App">
          <Switch>
              <Route to='/' component={Dashboard} />
          </Switch>
      </div>
    );
  }
}

export default App;
