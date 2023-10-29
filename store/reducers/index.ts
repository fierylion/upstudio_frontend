import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userDetailsReducer from './userDetailsReducer';

const rootReducer = combineReducers({
 auth: authReducer,
 userDetails: userDetailsReducer,
});

export default rootReducer;
