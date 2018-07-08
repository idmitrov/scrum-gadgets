import React, { Component } from 'react';
import { connect } from 'react-redux';
import Socket from '../../shared/Socket';

class Poker extends Component {
  constructor() {
    super();

    Socket.connect('token');

    Socket.subscribe('response-clients', (data) => {
      console.log(data)
    });

    Socket.emit('request-clients');
  }

  componentWillUnmount() {
    Socket.disconnect();
  }

  render() {
    return (
      <div>
          <p>Poker content</p>
      </div>
    );
  }
}

export default connect()(Poker);
