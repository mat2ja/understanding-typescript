"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    if (todoIdx !== -1) {
        TODOS[todoIdx] = { ...TODOS[todoIdx], text };
    }
    return TODOS[todoIdx];
};
exports.default = { addNewTodo, getAllTodos, TODOS, updateTodo };
