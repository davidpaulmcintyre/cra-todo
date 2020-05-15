const counts = (state = 0, action) => {
    switch (action.type) { 
      case 'RECEIVE_TODO_COUNT': {
        return action.payload.count;
      }
  
      default:
        return state;
    }
   
  };
  
  export default counts;
   