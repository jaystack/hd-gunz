import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';

export default connect(state => ({ full: state.gameState.players.length >= 4 }), { register })(
  class reg extends Component {
    state = {
      username: ''
    };

    submit = () => {
      if (this.state.username) this.props.register(this.state.username);
    };

    render() {
      const { full } = this.props;
      const { username } = this.state;
      return (
        <div className="login-page">
          {full && <div>Full, sry</div>}
          {!full &&
            <div className="form">
              <form className="login-form">
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={evt => {
                    this.setState({ username: evt.target.value });
                  }}
                />
                <button onClick={this.submit}>login</button>
              </form>
            </div>}
        </div>
      );
    }
  }
);
