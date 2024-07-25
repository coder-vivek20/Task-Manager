import React from 'react';

const TaskItem = ({ task, index, deleteTask, toggleTask }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div onClick={() => toggleTask(index)}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due: {task.dueDate}</p>
        <p>Priority: {task.priority}</p>
      </div>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
};

export default TaskItem;
