const pokerDefaults = {
  clients: []
};

export default (state = pokerDefaults, action) => {
  switch (action.type) {
    // TODO: EXRTACT ACTION TYPE
    case 'POKER_CLIENTS_SET': {
      return {
        ...state,
        clients: action.payload
      }
    }
    default: return state;
  }
}
