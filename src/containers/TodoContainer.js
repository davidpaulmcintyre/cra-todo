import React from 'react';
import { connect } from 'react-redux';
import {  getTodos, deleteTodo, editTodo, addTodo, getTodoCount } from '../actions/todo';
import TodoList from './TodoList';  

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], 
    };
  }

  componentDidMount() { 
    this.props.getTodos();
    this.props.getTodoCount();
  } 

  render() {
    const { getTodos, ...rest} = this.props;
    return ( 
          <TodoList  {...rest} /> 
    );
  }
}

const mapStateToProps = state => {
    return {
        todos: state.todos,
        count: state.count
    }
}

const mapDispatchToProps = dispatch => {
  return {  
    getTodos: () => {
      dispatch(getTodos());
    },  
    deleteTodo: (id) => (
      dispatch(deleteTodo(id))
    ),
    addTodo: (lbl) => {
      dispatch(addTodo(lbl))
    },
    editTodo: (todo) => {
      dispatch(editTodo(todo))
    },
    getTodoCount: () => {
      dispatch(getTodoCount())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);