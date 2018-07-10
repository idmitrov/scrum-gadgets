import React from 'react';

const PokerParticipant = (props) => (
  <div>
    <p>
        Name: {props.participant.name}
    </p>
    <p>
      {props.participant.voted ? 'Voted' : 'Voting...'}
    </p>
  </div>
);

export default PokerParticipant;
