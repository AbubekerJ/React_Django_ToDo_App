import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';

function TodoList({ todos, delet_Function, update_todo ,complate_todo }) {
  const [toggle, setToggle] = useState(false);
  const [gettodo, setGetTodo] = useState('');
  const [id, setId] = useState(0);

  const todomodel = (task, theid) => {
    setToggle(true);
    setGetTodo(task);
    setId(theid);
  };

  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
         
          <div className="todo-list-item" key={todo.id}>
        
            <div className="task">
              <input type="checkbox" onChange={(e)=>complate_todo(todo.id , e, todo.task, todo )}   />
              <p id="t_task" className={todo.completed ? "strike" : ""}>{todo.task}</p>

             
            </div>
            <div className="btn-container">
              <div className="edit" onClick={() => todomodel(todo.task, todo.id , )}>
                <FaEdit />
              </div>
              <div onClick={() => delet_Function(todo.id)} className="del">
                <AiFillDelete />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* model  */}
      {toggle && (
        <div className="modal-container">
          <div className="modal">
            <h1>Update Form</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update_todo(id, gettodo);
                setToggle(false);
              }}
            >
              <input type="text" placeholder="Update Todo" value={gettodo} onChange={(e) => setGetTodo(e.target.value)} required />
              <button id="add">Add</button>
            </form>
            <div className="btn-container">
              <button className="cancel mod-btn" onClick={() => setToggle(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
