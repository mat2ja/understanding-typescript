"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = __importDefault(require("./../methods/todos"));
const createTodo = (req, res) => {
    const { text } = req.body;
    const todo = todos_1.default.addNewTodo(text);
    res.status(201).send({ message: 'Todo was created', createdTodo: todo });
};
exports.createTodo = createTodo;
const getTodos = (req, res) => {
    const todos = todos_1.default.getAllTodos();
    res.status(200).send({ todos });
};
exports.getTodos = getTodos;
const updateTodo = (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    try {
        const todo = todos_1.default.updateTodo(id, text);
        if (todo) {
            res.status(200).send({ message: 'Todo was updated', updatedTodo: todo });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { id } = req.params;
    try {
        const { success } = todos_1.default.deleteTodo(id);
        if (success) {
            res.status(200).send({ message: 'Todo was deleted' });
        }
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
};
exports.deleteTodo = deleteTodo;
