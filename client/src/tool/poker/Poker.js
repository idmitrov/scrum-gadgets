import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sharedActions } from '../../shared/SharedActions';

class Poker extends Component {
  render() {
    this.props.sendSocket('test', 'hi');

    return (
      <div>
          <p>Poker content</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendSocket: (event, data) => {
      return dispatch(sharedActions.sendSocket(event, data));
    }
  }
}

export default connect(null, mapDispatchToProps)(Poker);
