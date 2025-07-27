import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import EditTaskForm from "./components/EditTaskForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTaskForm />} />
        <Route path="/edit/:id" element={<EditTaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;



