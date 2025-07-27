import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mx-full p-4 px-72 mr-72  ">
    <div className=" ">
      <h2 className="text-2xl text-center font-bold mb-4">All Tasks</h2>
      <div className="mb-4 text-end">
    <Link to="/add">
      <button className="bg-blue-500 text-white  cursor-pointer px-4 py-2 rounded">
        Add Task
      </button>
    </Link>
       </div>
      {tasks.map((task) => (
        <div key={task._id} className="border p-12  mb-3">
            <div className="font-semibold">Title</div>
          <h3 className="text-lg font-semibold">{task.title}</h3>

            <div className="font-semibold">Description</div>

          <p>{task.description}</p>
          {task.image && (
            <img src={`http://localhost:5000/${task.image}`} alt={task.title} className="my-2 w-48" 
            style={{ width: '200px', height: 'auto' }}
            />
          )}
          <p className="text-sm text-gray-600">Deadline: {task.deadline?.slice(0, 10)}</p>
          <button
            className="bg-red-500 text-white cursor-pointer px-3 py-1 mt-2 rounded"
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </button>
           

           <Link to={`/edit/${task._id}`}>
            <button className="bg-green-500 px-3 py-1 mt-2 cursor-pointer rounded ml-10">Update</button>
           </Link>

        </div>

      ))}
      </div>
    </div>
  );
};

export default TaskList;
