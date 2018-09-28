import React from 'react';
import { connect } from 'react-redux';
import { reset } from '../actions';

export default connect(null, { reset })(
  class Header extends React.PureComponent {
    handleReset = () => {
      this.props.reset();
    };

    render() {
      return <header><button onClick={this.handleReset}>RESET</button></header>;
    }
  }
);
