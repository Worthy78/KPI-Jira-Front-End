import { CREATE_MESSAGE, GET_ERRORS } from "../actions";
import updateObject from "../../App/utilitity";

const initialState = {
  message: null,
  error: {
    msg: {},
    code: null
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return updateObject(state, { message: action.message });

    case GET_ERRORS:
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
