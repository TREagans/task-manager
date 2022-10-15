const express = require("express");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskCtrl");

// creating an instance of Express Router
const router = express.Router();


/* Create Task ==> POST: /api/tasks/ */
router.post("/", createTask);

/* Get All Tasks ==> GET: /api/tasks/ */
router.get("/", getAllTasks);

/* Get Single Task ==> GET: /api/tasks/:id */
router.get("/:id", getSingleTask);

/* Delete Single Task ==> DELETE: /api/tasks/:id */
router.delete("/:id", deleteTask);

/* Update Single Task ==> PUT: /api/tasks/:id */
router.put("/:id", updateTask);


// exporting router as default
module.exports = router;
