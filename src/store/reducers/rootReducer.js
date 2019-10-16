import authReducer from './authReducer'
import UIReducer from './UIReducer';
import projectReducer from './projectReducer';

import { combineReducers } from 'redux'

import messagesReducer from './messagesReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  ui: UIReducer,
  messages: messagesReducer,
  project: projectReducer
});

export default rootReducer;

// the key name will be the data property on the state object