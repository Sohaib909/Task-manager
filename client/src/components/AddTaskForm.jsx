import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const AddTaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    image: null,
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setTaskData({ ...taskData, image: files[0] });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("deadline", taskData.deadline);
      formData.append("image", taskData.image);

      await axios.post("http://localhost:5000/api/tasks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Task added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    }
  };

  return (
    <div className="w-full min-h-screen ">
        <div className="items-center justify-center p-32 ">
            <div className="text-6xl text-center mb-20">Task Manager</div>
            <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>
    <form onSubmit={handleSubmit} className=" max-w-md  mx-auto p-6 space-y-5  ">
      
      <div>Title</div>
      <input
        
        type="text"
        name="title"
        placeholder="Title"
        value={taskData.title}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
        required
      />
      <div>Description</div>
      <textarea
        name="description"
        placeholder="Description"
        value={taskData.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
        required
      />
      Image
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
        required
      />
      Deadline
      <input
        type="date"
        name="deadline"
        value={taskData.deadline}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />
      <div className="mt-12">

     <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

      <Link to="/">
      <button
        type="button"
        className="bg-yellow-600 text-white px-4 ml-4 py-2 rounded"
      >
        View Tasks
      </button>
      </Link>
      </div>
    </form>
    </div>
    </div>
  );
};

export default AddTaskForm;
