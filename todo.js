const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let todos = [];
let nextId = 1;  // Initialize the counter

// Log middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
});

// Create a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: nextId++,  // Assign the current value of nextId and then increment it
        title: req.body.title,
        description: req.body.description
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    } else {
        todos[todoIndex].title = req.body.title;
        todos[todoIndex].description = req.body.description;
        res.json(todos[todoIndex]);
    }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    } else {
        todos.splice(todoIndex, 1);
        res.status(204).send("doneee");  // 204 No Content indicates successful deletion
    }
});

// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(3002, () => {
    console.log(`Server is running on port 3002`);
});

module.exports = app;
