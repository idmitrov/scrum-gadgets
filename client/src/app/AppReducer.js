const appDefaults = {
  page: 'Dashboard',
  loading: false
};

const AppReducer = (state = appDefaults, action) => {
  switch(action.type) {
    default: return state;
  }
}

export default AppReducer;
