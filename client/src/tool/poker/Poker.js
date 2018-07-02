import React from 'react';

import { connect } from 'socket.io-client';

const Poker = () => {
  // TODO: Move it in separated file
  connect('http://localhost:4001/poker');

  return (
      <div>
          <p>Poker content</p>
      </div>
  );
}

export default Poker;
