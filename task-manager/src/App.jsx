import React, { useState } from 'react';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.description) {
      if (editingIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditingIndex(index);
  };

  const toggleTaskDetails = (index) => {
    setActiveTaskIndex(activeTaskIndex === index ? null : index);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <form onSubmit={addTask}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Enter task description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">{editingIndex !== null ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-header" onClick={() => toggleTaskDetails(index)}>
              <div className="task-title">
                {task.title}
              </div>
              <div className="task-priority">
                Priority: {task.priority}
              </div>
              <div className={`arrow ${activeTaskIndex === index ? 'up' : 'down'}`}></div>
            </div>
            <div className={`task-details ${activeTaskIndex === index ? 'active' : ''}`}>
              <div>{task.description}</div>
              <div>Due Date: {task.dueDate}</div>
              <div className="task-actions">
                <button className="edit" onClick={() => editTask(index)}>Edit</button>
                <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
