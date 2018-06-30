export const appActionTypes = {
  setPageTitle: 'PAGE_TITLE_SET'
};

export const appActions = {
  /**
   * @name setPageTitle
   * @desc dispatch appActionTypes.setPageTitle with title text
   * @param {String} title
   */
  setPageTitle: (title) => (dispatch) => {
    return dispatch({
      type: appActionTypes.setPageTitle,
      payload: title
    });
  }
};