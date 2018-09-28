import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Reg from './components/reg';
import Bet from './components/bet';

export default connect(state => ({ status: state.gameState.status, me: state.me }))(
  class App extends Component {
    render() {
      const { status, me } = this.props;
      return (
        <div className="App">
          {status === 'waiting' && !me ? <Reg /> : null}
          {status === 'bet' && <Bet />}
        </div>
      );
    }
  }
);
