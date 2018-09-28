import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import reg from "./components/reg"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={reg}/>
        </Router>
      </div>
    );
  }
}

export default App;
