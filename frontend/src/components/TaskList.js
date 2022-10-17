import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  // this state variable will contain an object
  // and be passed as a prop to the <TaskForm> component
  const [formData, setFormData] = useState({
    name: "",
    isCompleted: false,
  });

  // destructure name from state object, and pass as prop
  const { name } = formData;

  // we'll use this function to update the name property
  const handleInputChange = (evt) => {
    // destructure name and value from evt.target
    const { name, value } = evt.target;

    // because formData is an object, we need to spread
    // the current values of formData, then pass new data
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTask = async (evt) => {
    // prevent default form behavior
    evt.preventDefault();

    // simple form validation
    if (name === "") {
      return toast.error("Task field is required!", { theme: "colored" });
    }

    try {
        // making a POST API request using Axios. When making a POST
        // request, 1st param is the URL, and the 2nd param is the data
        await axios.post("http://localhost:5000/api/tasks/", formData);

        // clear form after creating new task
        setFormData({ ...formData, name: ""});

    } catch (error) {
        // display and log any errors
        toast.error("Could not create task...", error.message, { theme: "colored" });
    }
  };

  return (
    <div>
      <h3>Task Manager</h3>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        handleCreateTask={handleCreateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> 0
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr />
      <Task />
    </div>
  );
};

export default TaskList;
