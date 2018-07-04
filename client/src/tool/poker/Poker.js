import React, { Component } from 'react';
import { connect } from 'react-redux';
import Socket from '../../shared/Socket';

class Poker extends Component {
  componentDidMount() {
    Socket.subscribe('response', (data) => {
      console.log(data)
    });
  }

  componentWillUnmount() {
    Socket.unsubscribe('response');
  }

  render() {
    Socket.emit('publish', 'Client request');

    return (
      <div>
          <p>Poker content</p>
      </div>
    );
  }
}

export default connect()(Poker);
