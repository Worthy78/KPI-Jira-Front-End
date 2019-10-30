import axios from "axios";
// import { authErrorMess, createMessage } from "./messages";

import * as actionTypes from "../actions";
import config from "../../config";
import { tokenConfig } from "../../App/utilitity";
import { errorMess, createMessage } from "./messages";


//Auth SUCCESS 
const authSuccess = res => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: res.data
    }
}

// CHECK 
export const checkAuthTimeout = expirationTime => {// TIME IN SECOND
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) //CONVERTING TO MILLISECOND
    }
}
// For checking state if timeout is'nt reached 
//and the token in localstorage is correct by getting corresponding user
export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            // TIME IS OUT
            dispatch(logout());
        } else {
            // UPDATE TIMEOUT INFO
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            dispatch(loadUser());
        }
    } else {
        dispatch(logout());
    }
};

// LOGIN USER
export const login = (username, password, stayConnected) => dispatch => {
    dispatch({ type: actionTypes.LOGIN_START });
    // Headers
    const headers = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    let body = {
        username,
        password
    }
    axios
        .post(config.baseUrl + "/api/auth/signin", body, headers)
        .then(res => {
            if (stayConnected) {
                const expirationDate = new Date(new Date().getTime() + (3600 * 1000) * 24); // ONE DAY
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(checkAuthTimeout(3600 * 24));
            } else {
                const expirationDate = new Date(new Date().getTime() + (3600 * 1000) * 3); // ONE 3 HOURS
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(checkAuthTimeout(3 * 3600));
            }
            dispatch(authSuccess(res)).then(dispatch(loadUser()));
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: actionTypes.LOGIN_FAIL
            });
            //dispatch(authErrorMess(err.response.data, err.response.status));
        });
};

// CHECK TOKEN & LOAD USER
//Auth Loaded
const userLoaded = res => ({
    type: actionTypes.USER_LOADED,
    payload: res.data
})
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: actionTypes.USER_LOADING_START })
    axios
        .get(`${config.baseUrl}/api/user/current`, tokenConfig())
        .then(res => {
            dispatch(userLoaded(res));
        })
        .catch(err => {
            dispatch(errorMess(err));
            dispatch({ type: actionTypes.USER_LOADING_FAIL });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    localStorage.removeItem("token");
    localStorage.removeItem('expirationDate');

    dispatch({
        type: actionTypes.LOGOUT_SUCCESS
    });
};

// SIGN UP USER
const registerSucces = res => {
    console.log('register payload', res)
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: res.data
    }
}

//
export const register = ({ username, password, email }) => dispatch => {
    dispatch({ type: actionTypes.REGISTER_START })

    axios
        .post(config.baseUrl + "/api/auth/signup", { username, password, name: email }, tokenConfig())
        .then(res => {
            dispatch(registerSucces(res));
            dispatch(createMessage("Utilisateur créé avec succès"))
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: actionTypes.REGISTER_FAIL
            });
            dispatch(errorMess(err));
        });
}