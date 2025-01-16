import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"; // Using react-icons for delete and edit icons

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [deletingTask, setDeletingTask] = useState(null); // Track task being deleted

  useEffect(() => {
    axios
      .get("https://todo-backend-alpha-ten.vercel.app/api/tasks")
      .then((response) => {
        setTasks(response.data);
      });
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      axios
        .post(
          "https://todo-backend-gcyrvc52y-shaziya78s-projects.vercel.app/api/tasks",
          { title: newTask, completed: false }
        )
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
        });
    }
  };

  const deleteTask = (id) => {
    setDeletingTask(id); // Set the task that is being deleted
    axios
      .delete(
        `https://todo-backend-gcyrvc52y-shaziya78s-projects.vercel.app/api/tasks/${id}`
      )
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id)); // Remove task after animation
        setDeletingTask(null); // Reset deleting state
      });
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    setEditingTask(id);
    setEditedTitle(taskToEdit.title);
  };

  const saveEdit = () => {
    if (editedTitle.trim()) {
      axios
        .put(
          `https://todo-backend-gcyrvc52y-shaziya78s-projects.vercel.app/api/tasks/${editingTask}`,
          { title: editedTitle }
        )
        .then((response) => {
          setTasks(
            tasks.map((task) =>
              task._id === editingTask ? response.data : task
            )
          );
          setEditingTask(null);
          setEditedTitle("");
        });
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8 px-4 sm:px-6 md:px-8 lg:px-16">
      <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">
        To Do List
      </h1>

      {/* Add New Task Section */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-4 w-full max-w-xl mx-auto">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300  ${
              deletingTask === task._id ? "strikethrough" : ""
            }`}
          >
            {editingTask === task._id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="text-lg font-semibold text-gray-700">
                  {task.title}
                </span>
                <div className="flex items-center space-x-4">
                  <FaEdit
                    onClick={() => editTask(task._id)}
                    className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300"
                    size={20}
                  />
                  <FaTrash
                    onClick={() => deleteTask(task._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition duration-300"
                    size={20}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
