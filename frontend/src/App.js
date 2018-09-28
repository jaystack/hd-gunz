import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import reg from "./components/reg"
import bet from "./components/bet"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact  path='/' component={reg}/>
            <Route exact  path="/bet" component={bet}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
