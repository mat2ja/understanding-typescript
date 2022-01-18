"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = require("../models/todo.model");
const TODOS = [];
const addNewTodo = (text) => {
    const todo = { id: Math.random().toString(), text };
    TODOS.push(todo);
    return todo;
};
const getAllTodos = () => {
    return TODOS;
};
const updateTodo = (id, text) => {
    const todoIdx = TODOS.findIndex((t) => t.id === id);
    if (todoIdx === -1) {
        throw new Error('Todo not found');
    }
    TODOS[todoIdx] = new todo_model_1.Todo(TODOS[todoIdx].id, text);
    return TODOS[todoIdx];
};
const deleteTodo = (id) => {
    const todoIdx = TODOS.findIndex((t) => t.id === id);
    if (todoIdx === -1) {
        throw new Error('Todo not found');
    }
    TODOS.splice(todoIdx, 1);
    return { success: true };
};
exports.default = { addNewTodo, getAllTodos, updateTodo, deleteTodo };
