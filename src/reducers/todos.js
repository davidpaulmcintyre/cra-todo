// import { guid } from "../utils"; 

const todos = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS': {
      return action.payload
    }

    case 'RECEIVE_TODO': { 
      return [action.payload, ...state]
    }

    case 'DELETE_TODO': {
      const ix = state.findIndex(item => item.id === action.payload.id);
      return [...state.slice(0, ix), ...state.slice(ix + 1)]
    } 

    case 'UPDATE_TODO': {
      const ix = state.findIndex(item => item.id === action.payload.id);
      return [...state.slice(0, ix), action.payload, ...state.slice(ix + 1)]
    } 

    default:
      return state;
  }
 
};

export default todos;
 