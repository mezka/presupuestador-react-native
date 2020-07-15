import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import addClientReducer from './addClientReducer';


export default combineReducers({
    clientData: reduceReducers({ clients: [], pending: [], error: null }, addClientReducer)
});