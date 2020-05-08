import React, { useCallback, useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";

import useDoubleClick from "../hooks/useDoubleClick";
import useOnEnter from "../hooks/useOnEnter"; 
export default function TodoItem({ todo, deleteTodo, editTodo }) { 
  const [labelValue, setLabelValue] = useState(todo.label);
  const [doneValue, setDoneValue] = useState(todo.done)
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    setLabelValue(todo.label) 
    setDoneValue(todo.done)
  }, [todo])
  const onDelete = useCallback(() => deleteTodo(todo.id), [todo.id, deleteTodo]);
  const handleCheckedChange = useCallback(() => {
    const _done = !doneValue
    setEditing(false)
    setDoneValue(_done)
    editTodo({...todo, done: _done})
  }, [deleteTodo, doneValue]) 
  const onTextChange = event => {
    console.log('onTextChange', event.target.value)
    setLabelValue(event.target.value)
  } 
  const finishedCallback = useCallback(
    () => {
      setEditing(false);  
      editTodo({id: todo.id, done: doneValue, label: labelValue.trim()})
    },
    [labelValue]
  );

  const onEnter = useOnEnter(finishedCallback, [labelValue]);
  const refInput = useRef(null);
  useOnClickOutside(refInput, finishedCallback);
  const handleViewClick = useDoubleClick(null, () => {
    setEditing(true)
    refInput.current.focus();
  });

  return (
    <li  
      onClick={handleViewClick}
      className={`${editing ? "editing" : ""} ${doneValue ? "completed" : ""}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={doneValue}
          onChange={handleCheckedChange}
          autoFocus={true}
        />
        <label>{labelValue}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
      {editing && (
        <input
          ref={refInput}
          className="edit"
          value={labelValue}
          onChange={onTextChange}
          onKeyPress={onEnter}
        />
      )}
    </li>
  );
}
