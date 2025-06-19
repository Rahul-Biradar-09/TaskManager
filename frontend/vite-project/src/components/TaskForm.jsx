import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, fetchTasks, updateTask } from '../api';
import './TaskForm.css';

const TaskForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  useEffect(() => {
    if (mode === 'edit') {
      fetchTasks().then((tasks) => {
        const task = tasks.find((t) => t.id === id);
        if (task) setFormData(task);
      });
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate required fields
    if (!formData.title || !formData.status) {
      alert("Title and status are required");
      return;
    }

    try {
      if (mode === 'add') {
        const result = await addTask(formData);
        console.log("Task added:", result);
      } else {
        const result = await updateTask(id, formData);
        console.log("Task updated:", result);
      }

      // ✅ Navigate back and reload
      navigate('/', { state: { reload: true } });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task Title"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate || ''}
          onChange={handleChange}
        />
        <button type="submit">
          {mode === 'add' ? 'Add Task' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
