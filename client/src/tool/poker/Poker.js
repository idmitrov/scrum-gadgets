import React, { Component } from 'react';
import { connect } from 'react-redux';
import Socket from '../../shared/Socket';

class Poker extends Component {
  componentDidMount() {
    Socket.connect(this.props.user.username, this.props.user.token);

    Socket.subscribe('response-clients', (data) => {
      // TODO: REPLACE LOCAL STATE WITH REDUX
      this.setState({
        clients: data
      })
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

          Participants: {this.state ? this.state.clients : 'none'}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Poker);
