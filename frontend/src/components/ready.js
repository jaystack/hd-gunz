import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ready } from '../actions';
import char1 from '../assets/char1.png';
import char2 from '../assets/char2.png';
import char3 from '../assets/char3.png';
import char4 from '../assets/char4.png';

const playersAssets = [char1, char2, char3, char4];

export default connect(state => ({ usernames: state.gameState.players.map(p => p.username), me: state.me }), { ready })(
  class Ready extends React.PureComponent {
    handleReady = () => {
      this.props.ready();
    };

    render() {
      const { usernames, me } = this.props;
      //return <div>{me} {usernames.join(',')}</div>;

      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
              </tr>
              {usernames.map((user, key) => (
                <tr key={key}>
                  <td>
                    &nbsp; <img src={playersAssets[key]} className="chars" />
                  </td>
                  <td>
                    {user === me ? <b>{user}</b> : <p>{user}</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {usernames.length > 1 &&
            <div className="buttonContainer">
              <a onClick={this.handleReady} href="#" className="myButton">Ready</a>
            </div>}
        </div>
      );
    }
  }
);
