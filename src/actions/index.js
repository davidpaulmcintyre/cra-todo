import fetch from 'isomorphic-fetch';
import { guid } from "../utils"; 

const rootUrl = "https://gevwera40m.execute-api.us-east-1.amazonaws.com/todo_staging";   
export const getTodos = () => {
    return dispatch => { 
        fetch(`${rootUrl}/todo`, {})
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
        .catch (error => console.log('An error occurred.', error))
    } 
}

const receiveTodos = payload => {
  return {
    type: 'RECEIVE_TODOS',
    payload
  }
} 

export const addTodo = label => {
  return dispatch => { 
    fetch(`${rootUrl}/todo`, {
      method: 'POST',
      body: JSON.stringify({id: guid(), label, done: false})
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
    .catch (error => console.log('An error occurred.', error))
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
      body: JSON.stringify({id})
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
    .catch (error => console.log('An error occurred deleteTodo.', error))
  } 
} 

export const editTodo = todo => { 
  return dispatch => { 
    fetch(`${rootUrl}/todo`, {
      method: 'PUT',
      body: JSON.stringify(todo)
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
    .catch (error => console.log('An error occurred editTodo.', error))
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

