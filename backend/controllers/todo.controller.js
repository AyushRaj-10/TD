import Todo from "../models/Todo.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });

    return sendSuccess(res, 200, "Todos fetched successfully", { todos });
});

export const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return sendSuccess(res, 200, "Todo fetched successfully", { todo });
});

export const createTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.create({
        title: req.body.title,
        description: req.body.description ?? "",
    });

    return sendSuccess(res, 201, "Todo created successfully", { todo });
});

export const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return sendSuccess(res, 200, "Todo updated successfully", { todo });
});

export const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return sendSuccess(res, 200, "Todo deleted successfully");
});
