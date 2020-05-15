import { combineReducers } from 'redux';
import todosReducer from './todos'; 
import countReducer from './count';

const rootReducer = combineReducers({
    todos: todosReducer, 
    count: countReducer,
});

export default rootReducer;

