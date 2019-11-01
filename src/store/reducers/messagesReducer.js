import { CREATE_MESSAGE, GET_ERRORS, AUTH_ERROR } from "../actions";
import updateObject from "../../App/utilitity";

const initialState = {
  message: undefined,
  error: {
    msg: {},
    code: undefined
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return updateObject(state, { message: action.message });

    case GET_ERRORS:
    case AUTH_ERROR:
      return updateObject(state,
        {
          error:
          {
            msg: action.payload.message,
            code: action.payload.code
          }
        });
    default:
      return state;
  }
}
