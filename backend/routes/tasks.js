const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { tasks } = require('../utils/storage');

const router = express.Router();

// GET /tasks - list all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST /tasks - create a new task
router.post('/', (req, res) => {
  const { title, description = '', status, dueDate = null } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: 'Title and status are required' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    status,
    dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - update a task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, description, status, dueDate } = req.body;

  const updatedTask = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    description: description ?? tasks[index].description,
    status: status ?? tasks[index].status,
    dueDate: dueDate ?? tasks[index].dueDate,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updatedTask;
  res.json(updatedTask);
});

// DELETE /tasks/:id - delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
