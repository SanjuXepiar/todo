import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";

import "./App.css";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todo")) || []);
  }, []);
  // functions
  const handleForm = (e) => {
    if (inputValue.trim() === "") return;
    e.preventDefault();
    setTodos([
      ...todos,
      {
        task: inputValue,
        id: uuidv4(),
      },
    ]);
    localStorage.setItem(
      "todo",
      JSON.stringify([
        ...todos,
        {
          task: inputValue,
          id: uuidv4(),
        },
      ])
    );
    setInputValue("");
  };
  const removeTask = (id) => {
    const updatedTodo = todos.filter((task) => task.id !== id);
    setTodos(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };
  return (
    <div className="mainBody">
      <div className="container">
        <form className="form" onSubmit={(e) => handleForm(e)}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder="Add To-Do"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="btn" type="submit">
            Add
          </button>
        </form>

        <div className="todos">
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <p>{todo.task}</p>
              <FaTrash
                style={{ cursor: "pointer" }}
                onClick={() => removeTask(todo.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
