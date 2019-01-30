import {combineReducers, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import projectReducer from './reducers/projectReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import utilityReducer from './reducers/utilityReducer';

const rootReducer = combineReducers({
    projects: projectReducer,
    auth: authReducer,
    users: userReducer,
    utility: utilityReducer
})


const configurestore = () => {
    return createStore(rootReducer, {}, applyMiddleware(reduxThunk))
}

export default configurestore;