import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// ===========================|| REDUX - MAIN STORE ||=========================== //

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
const persister = persistStore(store);

export { store, persister };
