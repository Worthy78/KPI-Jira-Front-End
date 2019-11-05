import * as actionTypes from "../actions";
import updateObject from '../../App/utilitity';

const initState = {
  authError: null,
  //AUTH
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isLoading: false,
  isLoadingUser: false,
  accessToken: localStorage.getItem("token"),
  // user: null
}
/*
// FUNCTIOND FOR AUTH REDUCER
const loading = (state, action) => {
  return updateObject(state, {
    isLoading: true
  });
}

const userLoaded = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    isLoading: false,
    user: action.payload
  });
}

*/

const authSuccess = (state, action) => {
  //  localStorage.setItem("id", action.payload.user.id); // save user's id
  const { accessToken } = action.payload;
  localStorage.setItem("token", accessToken);
  return updateObject(state, {
    // user,
    //accessToken,
    isAuthenticated: true,
    isLoading: false
  });
}

//HANDLING USER LOADING
const userLoaded = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    isLoadingUser: false,
    user: action.payload
  });
}
const loading = (state, name) => {
  return updateObject(state, {
    [name]: true
  });
}
const loadingFinished = (state, name) => {
  return updateObject(state, {
    [name]: false
  });
}

const authReducer = (state = initState, action) => {
  switch (action.type) {

    case actionTypes.LOGIN_SUCCESS:
      return authSuccess(state, action)

    //HANDLING  LOADING START
    case actionTypes.REGISTER_START:
    case actionTypes.LOGIN_START:
    case actionTypes.PASSWORD_CHANGE_START:
      return loading(state, 'isLoading');

    case actionTypes.USER_LOADING_START:
      return loading(state, 'isLoadingUser');

    case actionTypes.USER_LOADED:
      return userLoaded(state, action);

    // HADLING LOADING STOP
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.PASSWORD_CHANGE_SUCCESS:
    case actionTypes.PASSWORD_CHANGE_FAILED:
      return loadingFinished(state, 'isLoading')

    case actionTypes.USER_LOADING_FAIL:
      return loadingFinished(state, 'isLoadingUser');

    //LOGOUT  
    case actionTypes.LOGOUT_SUCCESS:
      console.log('signout success');
      return initState

    // // -----------AUTH---------------//

    // case actionTypes.USER_LOADED:
    //   return userLoaded(state, action);
    // case actionTypes.LOGIN_SUCCESS:
    //   return authSuccess(state, action);
    // case actionTypes.LOGIN_FAIL:
    // case actionTypes.LOGOUT_SUCCESS:
    //   return authFail(state, action);
    default:
      return state
  }
};

export default authReducer;
