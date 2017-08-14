import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PaymentsScreen from './screens/PaymentsScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <PaymentsScreen />
      </div>
    );
  }
}

export default App;
