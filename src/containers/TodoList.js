import React, { useState, useEffect, useCallback, useMemo } from "react"; 
import useInput from "../hooks/useInput";
import useOnEnter from "../hooks/useOnEnter"; 
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const { todos: todoProp = [], addTodo, editTodo, deleteTodo} = props;
  const [todos, setTodos] = useState(todoProp);
  const [filter, setFilter] = useState('all')
  useEffect(() => {
    setTodos(todoProp)
  }, [todoProp]) 

  const left = useMemo(() => todos.reduce((p, c) => p + (c.done ? 0 : 1), 0), [
    todos
  ]);

  const visibleTodos = useMemo( () =>  {
    if (filter === 'active'){
      return todos.filter(t => !t.done)
    } else if (filter === 'completed'){
      return todos.filter(t => t.done)
    } else {
      return todos;
    } 
  },
    [todos, filter]
  );

  const anyDone = useMemo(() => todos.some(i => i.done), [todos]);
  const allSelected = useMemo(() => visibleTodos.every(i => i.done), [
    visibleTodos
  ]);

  const onToggleAll = useCallback(
    () => {
      visibleTodos.forEach(i => editTodo({...i, done: !allSelected}));
    },
    [visibleTodos, allSelected]
  );

  const onClearCompleted = useCallback(
    () => {
      todos.forEach(i => {
        if (i.done) {
          deleteTodo(i.id);
        }
      });
    },
    [todos]
  );

  const [newValue, onNewValueChange, setNewValue] = useInput();
  const onAddTodo = useOnEnter(
    () => {
      if (newValue) {
        addTodo(newValue);
        setNewValue("");
      }
    },
    [newValue]
  );

  return (
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={onAddTodo}
          value={newValue}
          onChange={onNewValueChange}
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={allSelected}
          onChange={onToggleAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id}  todo={todo} deleteTodo={deleteTodo} editTodo={editTodo}   />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{left}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>
              All
            </button>
          </li>
          <li>
            <button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>
              Active
            </button>
          </li>
          <li>
            <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>
              Completed
            </button>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </React.Fragment>
  );
}
