import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const imagePath = req.file ? req.file.path : "";

    const task = new Task({
      title,
      description,
      deadline,
      image: imagePath,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getTasks = async (req,res) =>{
    try{
        const tasks = await Task.find().sort({created: -1});
        res.json(tasks);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    const updateFields = {
      title,
      description,
      deadline,
    };

    // Check if a new image file is uploaded
    if (req.file) {
      updateFields.image = req.file.path;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


export const deleteTask = async (req,res) =>{
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: "Task deleted"})
    }catch (error){
        res.status(500).json({error: error.message})
    }
};