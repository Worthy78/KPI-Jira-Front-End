import * as actionTypes from '../actions';
import config from '../../config';
import updateObject from '../../App/utilitity';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    //AUTH
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

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

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return { ...state };
        case actionTypes.FULL_SCREEN:
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };

        // -----------AUTH---------------//
        case actionTypes.USER_LOADING:
            return loading(state, action);
        case actionTypes.USER_LOADED:
            return userLoaded(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT_SUCCESS:
            return authFail(state, action);
        default:
            return state;
    }
};

export default reducer;