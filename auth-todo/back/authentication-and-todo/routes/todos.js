const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();
router.use(auth);

// GET all todos for the logged-in user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// CREATE a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = await Todo.create({
      userId: req.user.userId,
      title,
      description: description || '',
      completed: false,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Create todo error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Failed to create todo' });
  }
});

// GET a specific todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error('Get todo error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(500).json({ message: 'Failed to fetch todo' });
  }
});

// UPDATE a todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

module.exports = router;
