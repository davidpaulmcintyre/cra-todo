const counts = (state = null, action) => {
    switch (action.type) { 
      case 'RECEIVE_AUTHENTICATION': {
        return action.payload;
      }
  
      default:
        return state;
    }
   
  };
  
  export default counts;