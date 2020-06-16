import { combineReducers } from 'redux';
import todosReducer from './todos'; 
import countReducer from './count';
import authReducer from './authentication'

const rootReducer = combineReducers({
    todos: todosReducer, 
    count: countReducer,
    authenticated: authReducer,
});

export default rootReducer;

