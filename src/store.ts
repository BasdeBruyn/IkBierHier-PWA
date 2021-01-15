import {applyMiddleware, combineReducers, createStore} from 'redux';
import {locationReducer} from './reducers/LocationReducer';
import {authReducer} from "./reducers/AuthReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    locations: locationReducer,
    auth: authReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof reducers>