import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { noticesReducer, noticeDetailsReducer } from './reducers/noticeReducers'
import { authReducer } from './reducers/userReducers';

const reducer = combineReducers({
    notices: noticesReducer,
    noticeDetails: noticeDetailsReducer,
    auth: authReducer
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...
middleware)))

export default store;