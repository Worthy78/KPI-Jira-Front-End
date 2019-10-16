import * as actionTypes from "../actions";
import updateObject from '../../App/utilitity';

const initState = {
  authError: null,
  //AUTH
  // token: localStorage.getItem("token"),
  // isAuthenticated: null,
  isLoading: false,
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

const authSuccess = (state, action) => {
  //  localStorage.setItem("id", action.payload.user.id); // save user's id
  const { token, ...user } = action.payload;
  localStorage.setItem("token", token);
  return updateObject(state, {
    user,
    token,
    isAuthenticated: true,
    isLoading: false
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false
  });
}
*/

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
      console.log('login success');
      return updateObject(state,
        {
          authError: null,
          isLoading: false
        }
      )
    case actionTypes.LOGOUT_SUCCESS:
      console.log('signout success');
      return state

    // // -----------AUTH---------------//
    case actionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
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
