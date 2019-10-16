// GETTING CATEGORIES
import * as actionTypes from "../actions"
import Axios from "axios";
import config from "../../config";
import { errorMess } from "./messages";


export const getCategories = dispatch => {

    // Headers
    const headers = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    dispatch({ type: actionTypes.CATEGORY_LOADING });
    Axios
        .get(config.baseUrl + "/category", headers)
        .then(res => {
            dispatch({ type: actionTypes.CATEGORY_LOADED, payload: res.data });
        })
        .catch(err => {
            console.error(err)
            dispatch(errorMess(err));
        });
};
