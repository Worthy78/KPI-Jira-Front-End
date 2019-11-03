
import * as actionTypes from "../actions"
import updateObject from "../../App/utilitity";

const initialState = {
    category: {
        isLoading: false,
        categories: undefined
    },
    projects: null
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_LOADING:
            return updateObject(state,
                {
                    category: {
                        isLoading: true
                    }
                }
            )
        case actionTypes.CATEGORY_LOADED:
            return updateObject(state,
                {
                    category: {
                        //not necessary should be removed in futur releases
                        categories: action.payload,
                        isLoading: false
                    }
                }
            )

        default:
            return state
    }
}
export default projectReducer