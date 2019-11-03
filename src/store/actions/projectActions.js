// GETTING CATEGORIES
import * as actionTypes from "../actions"
import Axios from "axios";
import config from "../../constants/config";
import { errorMess } from "./messages";
import { tokenConfig } from "../../App/utilitity";
import { setUpSideBar } from "../../menu-items";


export const getCategories = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.CATEGORY_LOADING });
    Axios
        .get(config.apiBaseUrl + "/category", tokenConfig())
        .then(res => {
            dispatch({ type: actionTypes.CATEGORY_LOADED, payload: res.data });
            // B.Logic of navigation sidebar - 
            //adding categories to sidebar navigation
            setUpSideBar(res.data, getState().auth.user.username)
        })
        .catch(err => {
            console.error(err)
            dispatch(errorMess(err));
        });
};

