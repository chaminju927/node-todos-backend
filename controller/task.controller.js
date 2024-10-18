const Task = require("../model/Task");

const taskController = {};

// Create Task
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;

    const newTask = new Task({
      task,
      isComplete,
    });

    await newTask.save();
    res.status(200).json({ status: "success", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "success", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.putTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "task doesn't exist" });
    }

    res.status(200).json({ status: "success", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "task doesn't exist" });
    }

    res.status(200).json({ status: "success", message: "deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
