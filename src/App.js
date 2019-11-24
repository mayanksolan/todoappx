import React from "react";
import "./App.css";
import Bucket from "./components/Bucket";
import TodoList from "./components/TodoList";
import CheckedList from "./components/CheckedList";
import NewBucket from "./components/NewBucket";

function App() {
  return (
    <div className="App">
      <h1>Todo List App</h1>
      <NewBucket />
      <Bucket />
      <TodoList />
      <CheckedList />
    </div>
  );
}

export default App;
