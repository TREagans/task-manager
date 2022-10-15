const Task = require("../model/taskModel");

const createTask = async (req, res) => {
  try {
    // using create method to create a new record
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to save task",
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    // find (without params) returns all records
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      taskCount: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
      error: error.message,
    });
  }
};

const getSingleTask = async (req, res) => {
  // destructure the id param for multi use
  const { id } = req.params;

  try {
    // in order to get the id passed in, we use
    // req.params.id (the route param name we defined)
    const task = await Task.findById(id);

    // if id does not exist in database
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  // destructure the id param for multi use
  const { id } = req.params;

  try {
    // find the task to delete by id and await
    const task = await Task.findByIdAndDelete(id);

    // if id does not exist in database
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  // destructure the id param for multi use
  const { id } = req.params;

  try {
    // when updating with PUT, we have to send all required fields from model
    // 1st param: is an object that consist of the ID (_id)
    // 2nd param: the request body
    // 3rd param: an object that specifies we want to make a new entry in db
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    // if id does not exist in database
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // return the updated task
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
};

// when updating with PATCH, we only need to send field we're updating
