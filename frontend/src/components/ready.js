import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ready } from '../actions';

export default connect(state => ({ usernames: state.gameState.players.map(p => p.username), me: state.me }), { ready })(
  class Ready extends React.PureComponent {
    handleReady = () => {
      this.props.ready();
    };

    render() {
      const { usernames, me } = this.props;
      return <div>{me} {usernames.join(',')}</div>;
    }
  }
);
