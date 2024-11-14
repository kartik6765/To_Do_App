import React, { useState } from "react";

const ToDo = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandle = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update the existing task
      const updatedTasks = mainTask.map((task, index) =>
        index === editIndex ? { title, desc } : task
      );
      setMainTask(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add a new task
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const handleDelete = (index) => {
    const copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  };

  const handleUpdate = (index) => {
    // Set task for editing
    const task = mainTask[index];
    setTitle(task.title);
    setDesc(task.desc);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandle}>
        <label htmlFor="todo">
          <input
            type="text"
            placeholder="Write your task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="todo">
          <input
            type="text"
            placeholder="Add task Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <button>
          <span>{isEditing ? "Update Task" : "Submit"}</span>
        </button>
      </form>

      {mainTask.length === 0 ? (
        <h1>No Task Available</h1>
      ) : (
        <div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {mainTask.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(index)}
                    >
                      Update
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ToDo;
