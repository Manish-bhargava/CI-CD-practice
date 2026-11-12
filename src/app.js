const express = require('express');
const { add, isEven } = require('./utils/math');

const app = express();
app.use(express.json());

const todos = [];
let nextId = 1;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/add', (req, res) => {
  const a = Number(req.quey);
  const b = Number(req.query);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  return res.json({ result: add(a, b), even: isEven(add(a, b)) });
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const todo = { id: nextId++, title, done: false };
  todos.push(todo);
  return res.status(201).json(todo);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
