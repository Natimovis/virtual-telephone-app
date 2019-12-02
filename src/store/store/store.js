import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import ContactsReducer from '../reducers/ContactsReducer';
import NotesReducer from '../reducers/NotesReducer';

const rootReducer = combineReducers({
  CR: ContactsReducer,
  NR: NotesReducer
})


export default createStore(rootReducer, applyMiddleware(promiseMiddleware));