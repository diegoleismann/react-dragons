import React, { Component } from 'react';
import './assets/css/app.css';
import AppRouter from './Router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
