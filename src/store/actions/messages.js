import { CREATE_MESSAGE, GET_ERRORS } from "../actions";

// CREATE MESSAGE
export const createMessage = message => {
  return {
    type: CREATE_MESSAGE,
    message
  };
};

// RETURN ERRORS
export const authErrorMess = (error) => {
  return {
    type: GET_ERRORS,
    payload: error
  };
};
