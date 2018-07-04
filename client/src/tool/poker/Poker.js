import React, { Component } from 'react';
import { connect } from 'react-redux';
import Socket from '../../shared/Socket';

class Poker extends Component {
  constructor() {
    super();

    Socket.subscribe('response', (data) => {
      console.log(data)
    });

    Socket.emit('publish', 'Client request');
  }

  componentWillUnmount() {
    Socket.unsubscribe('response');
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
