import React, { Component } from 'react';


class reg extends Component {

    state = {
        username: null
    }

    attempReg = (username) => {
        //@TODO MAKE SOCKET IO CONNECTION
    }

    render() {
        return (
        <div className="login-page">
            <div className="form">
              <form className="login-form">
                <input type="text" placeholder="username" onChange={evt => {this.setState({username: evt.target.value})}}/>
                <button onClick={this.attempReg(this.state.username)}>login</button>
              </form>
            </div>
          </div>
        );
    }
}

export default reg;