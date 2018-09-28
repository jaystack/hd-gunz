import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Reg from './components/reg';
import Ready from './components/ready';
import Bet from './components/bet';
import Lightbulb from './components/lightbulb';
import Dead from './components/dead';

export default connect(state => ({ status: state.gameState.status, me: state.me }))(
  class App extends Component {
    render() {
      let { status, me } = this.props;
      return (
        <div className="App">
          {status === 'waiting' && (!me ? <Reg /> : <Ready />)}
          {status === 'bet' && <Bet />}
          {status === 'bulb' && <Lightbulb />}
          {status === 'dead' && <Dead />}
        </div>
      );
    }
  }
);
