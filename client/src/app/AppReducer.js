import { appActionTypes } from './AppActions';

const appDefaults = {
  page: 'Dashboard',
  loading: false
};

const AppReducer = (state = appDefaults, action) => {
  switch(action.type) {
    // SET PAGE TITLE
    case appActionTypes.setPageTitle: {
      return {
        ...state,
        page: action.payload
      }
    }
    default: return state;
  }
}

export default AppReducer;
