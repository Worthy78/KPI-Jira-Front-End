import axios from "axios";
// import { authErrorMess, createMessage } from "./messages";

import * as actionTypes from "../actions";
import config from "../../constants/config";
import { tokenConfig } from "../../App/utilitity";
import { authErrorMess, createMessage, errorMess } from "./messages";
import { resetNavigation } from "../../menu-items";
import { getCategories } from "./projectActions";


// CONST 
const HOUR_IN_MILLISECOND = (3600 * 1000)

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
        .post(config.apiBaseUrl + "/api/auth/signin", body, headers)
        .then(res => {
            if (stayConnected) {
                const expirationDate = new Date(new Date().getTime() + HOUR_IN_MILLISECOND * 24); // ONE DAY
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(checkAuthTimeout(3600 * 24));
            } else {
                const expirationDate = new Date(new Date().getTime() + HOUR_IN_MILLISECOND * 3); // ONE 3 HOURS
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(checkAuthTimeout(3 * 3600));
            }
            dispatch(loadUser(res.data.accessToken))
            dispatch(authSuccess(res))
        })
        .catch(err => {
            console.log('login error', err)
            dispatch(errorMess({ message: 'username ou mot de passe incorrect' }));
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
// GETTING user and CATEGORIES (categories will setup navigation sidebar items)
export const loadUser = (token = undefined) => (dispatch, getState) => {
    // User Loading
    dispatch({ type: actionTypes.USER_LOADING_START })
    axios
        .get(`${config.apiBaseUrl}/api/user/current`, tokenConfig(token))
        .then(res => {
            dispatch(userLoaded(res));
            // GETTING CATEGORIES
            dispatch(getCategories())
        })
        .catch(err => {
            dispatch(authErrorMess(err));
            dispatch({ type: actionTypes.USER_LOADING_FAIL });
            dispatch(logout());
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    //Reset navigation bar
    resetNavigation()
    //Reset token and expiration date
    localStorage.removeItem("token");
    localStorage.removeItem('expirationDate');
    // REDIRECT TO LOGIN PAGE
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
        .post(config.apiBaseUrl + "/api/auth/signup", { username, password, name: email }, tokenConfig())
        .then(res => {
            dispatch(registerSucces(res));
            dispatch(createMessage("Utilisateur créé avec succès"))
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: actionTypes.REGISTER_FAIL
            });
            //dispatch(authErrorMess(err));
            dispatch(errorMess({ message: 'Utilisateur déjà existant ou mot de passe trop court(<6) ' }));
        });
}


// CHANGE PASSWORD
export const changePassword = (passwordData) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.PASSWORD_CHANGE_START
    })
    axios
        .post(`${config.apiBaseUrl}/api/auth/updatePassword?password=${passwordData.newPassword1}&oldpassword=${passwordData.oldPassword}`, null, tokenConfig())
        .then(res => {
            dispatch(createMessage("Mot de passe changé avec Success"))
            dispatch({
                type: actionTypes.PASSWORD_CHANGE_SUCCESS
            })
        })
        .catch(err => {
            console.log('err.data', err.data)
            console.log('err.dataded', err)
            console.log('err.dataded', err.message)
            dispatch(authErrorMess(err));
            dispatch({
                type: actionTypes.PASSWORD_CHANGE_FAILED
            });
        });
};