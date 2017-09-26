import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Funds from './Funds.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chart of Securities</h2>
        </div>
        <Funds symbol = "AAPL"></Funds>
      </div>
    );
  }
}

export default App;
