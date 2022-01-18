"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
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
    const todo = todos_1.default.updateTodo(id, text);
    if (todo) {
        res.status(200).send({ message: 'Todo was updated', updatedTodo: todo });
    }
    else {
        res.status(404).send({ message: 'Todo not found' });
    }
};
exports.updateTodo = updateTodo;
