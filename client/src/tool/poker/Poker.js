import React, { Component } from 'react';
import { connect } from 'react-redux';
import Socket from '../../shared/Socket';

import PokerParticipan from './PokerParticipan';

class Poker extends Component {
  componentDidMount() {
    Socket.connect(this.props.user.username, this.props.user.token);

    Socket.subscribe('response-clients', (data) => {
      // TODO: REPLACE LOCAL STATE WITH REDUX
      this.props.setPokerClinets(data);
      // this.setState({
      //   clients: data
      // })
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

          {
            this.props.clients.map(client =>
              <PokerParticipan key={client.id} participant={client}></PokerParticipan>
            )
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    clients: state.poker.clients
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPokerClinets: (clients) => {
      return dispatch({
        // TODO: EXRTACT ACTION TYPE
        type: 'POKER_CLIENTS_SET',
        payload: clients
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poker);
