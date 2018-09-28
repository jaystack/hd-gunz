import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/blink.css';
import { playSound } from '../actions';

export default connect(null, { playSound })(
  class dead extends Component {
    componentDidMount() {
      this.props.playSound('killed3');
    }

    render() {
      return (
        <div className="deadContainer">
          <div class="blink"><span>You are dead</span></div>
        </div>
      );
    }
  }
);
