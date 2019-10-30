import axios from "axios";
// import { authErrorMess, createMessage } from "./messages";

import * as actionTypes from "../actions";
import config from "../../config";
import { tokenConfig } from "../../App/utilitity";
import { errorMess, createMessage } from "./messages";

//Auth starting (login/register)
//Auth Loading

// //Auth Loaded
// const userLoaded = res => ({
//     type: actionTypes.USER_LOADED,
//     payload: res.data
// })


//Auth SUCCESS 
const authSuccess = res => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: res.data
    }
}

// CHECK 
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


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
            if (!stayConnected) {
                const expirationDate = new Date(new Date().getTime() + (3600 * 1000) * 24);
                localStorage.setItem('expirationDate', expirationDate);
            }

            dispatch(checkAuthTimeout(3600));
            dispatch(authSuccess(res));

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
            dispatch(logout())
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