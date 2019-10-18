// GETTING CATEGORIES
import * as actionTypes from "../actions"
import Axios from "axios";
import config from "../../config";
import { errorMess } from "./messages";
import { tokenConfig } from "../../App/utilitity";


export const getCategories = dispatch => {


    dispatch({ type: actionTypes.CATEGORY_LOADING });
    Axios
        .get(config.baseUrl + "/category", tokenConfig)
        .then(res => {
            dispatch({ type: actionTypes.CATEGORY_LOADED, payload: res.data });
        })
        .catch(err => {
            console.error(err)
            dispatch(errorMess(err));
        });
};
