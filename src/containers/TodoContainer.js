import React from 'react';
import { connect } from 'react-redux';
import { getTodos, deleteTodo, editTodo, addTodo } from '../actions';
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
        todos: state.todos
    }
}

const mapDispatchToProps = dispatch => {
  return {
    getTodos: () => {
      dispatch(getTodos());
    },  
    deleteTodo: id => (
      dispatch(deleteTodo(id))
    ),
    addTodo: lbl => {
      dispatch(addTodo(lbl))
    },
    editTodo: todo => {
      dispatch(editTodo(todo))
    } 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);