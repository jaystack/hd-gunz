import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Reg from './components/reg';
import Ready from './components/ready';
import Bet from './components/bet';
import Lightbulb from './components/lightbulb';
import Dead from './components/dead';
import Header from './components/header';
import { playSound } from './actions';

export default connect(
  state => {
    const player = state.gameState.players.find(p => p.username === state.me);
    return { status: state.gameState.status, me: state.me, alive: player ? player.alive : true };
  },
  { playSound }
)(
  class App extends Component {
    componentDidMount() {
      this.props.playSound('guns-n-bullets');
    }

    render() {
      let { status, me, alive } = this.props;
      return (
        <div className="App">
          {status === 'waiting' && (!me ? <Reg /> : <Ready />)}
          {status === 'bet' && <Bet />}
          {status === 'bulb' && <Lightbulb />}
          {status === 'shoot' && !alive && <Dead />}
          <Header />
        </div>
      );
    }
  }
);
