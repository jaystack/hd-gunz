import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/lightbulb.css';
import { shoot } from '../actions';

export default connect(state => ({ status: state.gameState.status }), { shoot })(
  class lightbulb extends Component {
    attempShoot = () => {
      if (this.props.status !== 'shoot') return;
      this.props.shoot();
    };

    render() {
      const { status } = this.props;
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
          <div style={{ marginTop: 400 }}>
            <a onClick={this.switchLightbulb} href="#" className="myButton">Ready</a>
          </div>
          {!bulb &&
            <div style={{ marginTop: 50 }}>
              <a onClick={this.attempShoot} href="#" className="shootButton">Shoot</a>
            </div>}
        </div>
      );
    }
  }
);
