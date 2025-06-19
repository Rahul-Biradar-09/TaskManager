import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 👇 Run reload if redirected from add/edit with state
  useEffect(() => {
    if (location.state?.reload) {
      loadTasks();
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      loadTasks();
    }
  };

  return (
    <div className="container">
      <h1>📋 Task Manager</h1>
      <button className="add-btn" onClick={() => navigate('/add')}>
        Add Task
      </button>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks available. Start by adding one.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="card-header">
                <h3>{task.title}</h3>
                <span className={`status ${task.status}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              <p>{task.description}</p>
              {task.dueDate && <p className="due">📅 Due: {task.dueDate}</p>}
              <div className="actions">
                <button onClick={() => navigate(`/edit/${task.id}`)}> Edit</button>
                <button className="delete" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
