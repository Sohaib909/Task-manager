import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    image: "", // store image URL string for preview
    deadline: "",
  });
  const [imageFile, setImageFile] = useState(null); // for file upload

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTaskData(res.data);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setTaskData({ ...taskData, image: file?.name }); // optional for preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("deadline", taskData.deadline);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(`http://localhost:5000/api/tasks/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Task updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>

      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />

      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />

      {/* Image preview (if image is already uploaded) */}
      {taskData.image && !imageFile && (
        <div className="mb-3">
          <img
            src={`http://localhost:5000/uploads/${taskData.image}`}
            alt="Task"
            className="w-32 h-32 object-cover"
          />
        </div>
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-3 p-2 border"
      />

      <input
        type="date"
        name="deadline"
        value={taskData.deadline?.slice(0, 10)}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Update Task
      </button>
    </form>
  );
};

export default EditTaskForm;
