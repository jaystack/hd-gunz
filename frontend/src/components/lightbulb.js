import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/lightbulb.css';
import { shoot, playSound } from '../actions';

export default connect(state => ({ status: state.gameState.status }), { shoot, playSound })(
  class lightbulb extends Component {
    state = {
      displayRevolver: true
    };

    componentDidMount() {
      this.props.playSound('revolver-spinning');
      setTimeout(() => this.setState({ displayRevolver: false }), 3000);
    }

    attempShoot = () => {
      if (this.props.status !== 'shoot') return;
      this.props.shoot();
    };

    render() {
      const { status } = this.props;
      const { displayRevolver } = this.state;
      const bulb = status === 'bulb';
      return (
        <div>
          <div id="lampadario">
            <input type="radio" name="switch" value={bulb ? 'on' : 'off'} />
            <input type="radio" name="switch" value={bulb ? 'on' : 'off'} checked="checked" />
            <label for="switch" />
            <div id="filo" />
            <div id="lampadina">
              <div id="sorpresa" />
            </div>
          </div>

          <div className="revolverContainer">
            {!displayRevolver &&
              bulb &&
              <div>
                <a onClick={this.attempShoot} href="#" className="shootButton">Shoot</a>
              </div>}
            {displayRevolver &&
              bulb &&
              <div className="loader">
                <div className="inner" />
              </div>}
          </div>
        </div>
      );
    }
  }
);
