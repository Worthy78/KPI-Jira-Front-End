import axios from "axios";
// import { authErrorMess, createMessage } from "./messages";

import * as actionTypes from "../actions";
import config from "../../config";

//Auth starting (login/register)
//Auth Loading
const userLoading = {
    type: actionTypes.USER_LOADING
}

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
    dispatch(userLoading);
    // const token = btoa(`${username}:${password}`)
    // console.log('btoa(string)', token)
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
        .post(config.baseUrl + "/authenticate", body, headers)
        .then(res => {
            if (!stayConnected) {
                const expirationDate = new Date(new Date().getTime() + (3600 * 1000) * 24);
                localStorage.setItem('expirationDate', expirationDate);
            }

            dispatch(checkAuthTimeout(3600));
            dispatch(authSuccess(res));

        })
        .catch(err => {
            console.error(err.response.data, err.response.status)
            dispatch({
                type: actionTypes.LOGIN_FAIL
            });
            //dispatch(authErrorMess(err.response.data, err.response.status));
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    if (getState().token !== null) {
        localStorage.removeItem("token");
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('id');

        dispatch({
            type: actionTypes.LOGOUT_SUCCESS
        });

    }
};