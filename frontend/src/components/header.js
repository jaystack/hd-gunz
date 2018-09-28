import React from 'react';
import { connect } from 'react-redux';
import { reset } from '../actions';

export default connect(null, { reset })(
  class Header extends React.PureComponent {
    handleReset = () => {
      this.props.reset();
    };

    render() {
      return (
        <header style={{ position: 'fixed', bottom: 0 }}><button onClick={this.handleReset}>RESET</button></header>
      );
    }
  }
);
