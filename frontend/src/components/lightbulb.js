import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/lightbulb.css';
import { shoot, playSound } from '../actions';

export default connect(state => ({ status: state.gameState.status }), { shoot, playSound })(
  class lightbulb extends Component {
    componentDidMount() {
      this.props.playSound('revolver-spinning');
    }

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
          {!bulb &&
            <div style={{ marginTop: 50 }}>
              <a onClick={this.attempShoot} href="#" className="shootButton">Shoot</a>
            </div>}
          {bulb &&
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
