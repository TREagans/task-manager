// receives props from <TaskList>
const TaskForm = ({ name, handleInputChange, handleCreateTask }) => {
  return (
    // handleCreateTask is passed in as props
    <form className="task-form" onSubmit={handleCreateTask}>

      {/* name (state), handleInputChange are 
      passed in as props from <TaskList>  */}
      <input
        type="text"
        placeholder="Add a task"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
