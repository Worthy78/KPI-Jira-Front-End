import * as actionTypes from "../actions";
import updateObject from '../../App/utilitity';

const initState = {
  authError: null,
  //AUTH
  isAuthenticated: false,
  isLoading: false,
  isLoadingUser: false,
  token: localStorage.getItem("token"),
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
  console.log('action', action)
  const { accessToken } = action.payload;
  localStorage.setItem("token", accessToken);
  return updateObject(state, {
    // user,
    accessToken,
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

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAIL:
      console.log('login error', action.payload);
      return updateObject(state,
        {
          authError: 'Login failed',
          isLoading: false
        }
      )

    case actionTypes.LOGIN_SUCCESS:
      return authSuccess(state, action)

    //HANDLING  LOADING START
    case actionTypes.REGISTER_START:
    case actionTypes.LOGIN_START:
      return loading(state, 'isLoading');

    case actionTypes.USER_LOADING_START:
      return loading(state, 'isLoadingUser');

    case actionTypes.USER_LOADED:
      return userLoaded(state, action);

    //LOGOUT  
    case actionTypes.LOGOUT_SUCCESS:
      console.log('signout success');
      return initState

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.REGISTER_FAIL:
      return updateObject(state, { isLoading: false })



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
