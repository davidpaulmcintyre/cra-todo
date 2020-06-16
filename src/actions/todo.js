import fetch from 'isomorphic-fetch';
import { guid } from "../utils";  

export const authenticate = strToken => { 
  const url = 'https://dpm-todo-web-app.auth.us-east-1.amazoncognito.com/oauth2/userInfo'
  return dispatch => { 
    fetch(url, { 
      headers: {Authorization: strToken}
    })
    .then(response => {
      if (response.status >= 300) {
        throw Error(response.statusText);
      }
      dispatch(receiveAuthentication(true)) 
      // cookie will be set
        // return response.json()
      }
    ) 
    .catch (error => { 
      console.log('An error occurred obtaining token.', error)
      dispatch(receiveAuthentication(false)) 
    })
} 
}

const rootUrl = "https://gevwera40m.execute-api.us-east-1.amazonaws.com/todo_staging";   
export const getTodos = () => {
    return dispatch => { 
        fetch(`${rootUrl}/todo`, {
          headers:{'Authorization': global.token},
        })
        .then(response => {
          if (response.status >= 300) {
            throw Error(response.statusText);
          }
            return response.json()
          }
        )
        .then(data => { 
          const items = JSON.parse(data.body);
          dispatch(receiveTodos(items)) 
        })
        .catch (error => {
          window.token = null;
          console.log('An error occurred deleteTodo.', error)
        })
    } 
}

// count of all, incl ones deleted and not returned by current GET
export const getTodoCount = () => {
  return dispatch => { 
      fetch(`${rootUrl}/todo-count`, {
        // headers:{'Authorization': global.token},
      })
      .then(response => {
        if (response.status >= 300) {
          throw Error(response.statusText);
        }
          return response.json()
        }
      )
      .then(data => { 
        const item = JSON.parse(data.body);
        dispatch(receiveTodoCount(item)) 
      })
      .catch (error => {
        window.token = null;
        console.log('An error occurred deleteTodo.', error)
      })
  } 
}

const receiveTodos = payload => {
  return {
    type: 'RECEIVE_TODOS',
    payload
  }
} 


const receiveTodoCount = payload => {
  return {
    type: 'RECEIVE_TODO_COUNT',
    payload
  }
} 

export const addTodo = label => {
  return dispatch => { 
    fetch(`${rootUrl}/todo`, {
      method: 'POST',
      body: JSON.stringify({id: guid(), label, done: false}),
      // headers:{'Authorization': global.token},
    })
    .then(response => {
      if (response.status >= 300) {
        throw Error(response.statusText);
      }
        return response.json()
      }
    )
    .then(data => { 
      const item = JSON.parse(data.body);
      dispatch(receiveTodo(item)) 
    })
    .then(() => {
      dispatch(getTodoCount());
    })
    .catch (error => {
      window.token = null;
      console.log('An error occurred deleteTodo.', error)
    })
  } 
}

const receiveTodo = payload => {
  return {
    type: 'RECEIVE_TODO',
    payload
  }
} 

export const deleteTodo = id => {
  return dispatch => { 
    fetch(`${rootUrl}/todo`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      // headers:{'Authorization': global.token},
    })
    .then(response => {
      if (response.status >= 300) {
        throw Error(response.statusText);
      }
        return response.json()
      }
    )
    .then(data => { 
      const item = JSON.parse(data.body);
      dispatch(receiveDeletedTodo(item)) 
    })
    .catch (error => {
      window.token = null;
      console.log('An error occurred deleteTodo.', error)
    })
  } 
} 

export const editTodo = todo => { 
  return dispatch => { 
    fetch(`${rootUrl}/todo`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      // headers:{'Authorization': global.token},
    })
    .then(response => {
      if (response.status >= 300) {
        throw Error(response.statusText);
      }
        return response.json()
      }
    )
    .then(data => { 
      const item = JSON.parse(data.body);
      dispatch(receiveUpdatedTodo(item)) 
    })
    .catch (error => {
      window.token = null;
      console.log('An error occurred deleteTodo.', error)
    })
  } 
}  

const receiveDeletedTodo = payload => {
  return {
    type: 'DELETE_TODO',
    payload
  }
} 

const receiveUpdatedTodo = payload => {
  return {
    type: 'UPDATE_TODO',
    payload
  }
} 

const receiveAuthentication  = payload => {
  return {
    type: 'RECEIVE_AUTHENTICATION',
    payload
  }
} 

