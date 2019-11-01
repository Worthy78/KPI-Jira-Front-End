import { CREATE_MESSAGE, AUTH_ERROR } from "../actions";

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
    type: AUTH_ERROR,
    payload: error
  };
};
export const errorMess = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
