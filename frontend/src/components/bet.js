import React, { Component } from 'react';
import { connect } from 'react-redux';
import bullet from '../assets/bullet.png';
import '../css/revolver.css';
import '../css/button.css';
import char1 from '../assets/char1.png';
import char2 from '../assets/char2.png';
import char3 from '../assets/char3.png';
import char4 from '../assets/char4.png';
import { bet, betSubmit, playSound } from '../actions';

const playersAssets = [char1, char2, char3, char4];

export default connect(
  state => {
    const me = state.gameState.players.find(p => p.username === state.me);
    return {
      usernames: state.gameState.players,
      bullets: me ? me.bullets : 0,
      budget: me ? me.budget : 0,
      bet: me ? me.bet : 0,
      submitted: me ? me.betSubmitted : false,
      me: me
    };
  },
  { placeBet: bet, betSubmit, playSound }
)(
  class bet extends Component {
    componentDidMount() {
      this.props.playSound('lets-start');
      setTimeout(() => {
        this.props.playSound('placeyourbets');
      }, 2000);
    }

    takeBet = () => {
      this.props.playSound('coins');
      this.props.placeBet(5);
    };

    attempBet = () => {
      if (this.props.betSubmitted) return;
      this.props.betSubmit();
    };

    render() {
      const { usernames, bullets, budget, bet, betSubmitted, me } = this.props;
      return (
        <div>
          <div className="bulletContainer">
            {Array.from({ length: bullets }).map((e, i) => <img src={bullet} key={i} className="bullet" />)}
          </div>
          <div className="playersContainer">
            {usernames.map(
              (e, i) =>
                (e.username !== me.username
                  ? <div key={i} className="userContainer">
                      <img src={playersAssets[i]} className="chars" />
                      <div className="userDetials">
                        <p> {e.username}</p>
                        <p>Bet : {e.bet}</p>
                      </div>
                    </div>
                  : null)
            )}
          </div>
          <div className="coinContainer">
            <div onClick={this.attempBet} className="coin gold"><p>{budget}</p></div>
            <div className="coin silver"><p>{bet}</p></div>
          </div>
          {!betSubmitted &&
            <div className="buttonContainer">
              <a onClick={this.takeBet} href="#" className="myButton">Start</a>
            </div>}
          {betSubmitted &&
            <div className="revolverContainer">
              <div className="loader">
                <div className="inner" />
              </div>
            </div>}
        </div>
      );
    }
  }
);
