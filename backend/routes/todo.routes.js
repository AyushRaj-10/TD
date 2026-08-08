import express from "express";

import {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.controller.js";
import {
    validateCreateTodo,
    validateTodoId,
    validateUpdateTodo,
} from "../validators/todo.validator.js";

const router = express.Router();

router.get("/", getTodos);

router.get("/:id", validateTodoId, getTodo);

router.post("/", validateCreateTodo, createTodo);

router.put("/:id", validateTodoId, validateUpdateTodo, updateTodo);

router.delete("/:id", validateTodoId, deleteTodo);

export default router;
