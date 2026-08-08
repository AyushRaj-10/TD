import mongoose from "mongoose";

import ApiError from "../utils/ApiError.js";

const normalizeString = (value, fieldName, { required = false } = {}) => {
    if (value === undefined || value === null) {
        if (required) {
            throw new ApiError(400, `${fieldName} is required`);
        }

        return undefined;
    }

    if (typeof value !== "string") {
        throw new ApiError(400, `${fieldName} must be a string`);
    }

    return value.trim();
};

export const validateTodoId = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return next(new ApiError(400, "Invalid todo id"));
    }

    return next();
};

export const validateCreateTodo = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError(400, "Request body is required");
        }

        const title = normalizeString(req.body.title, "Title", { required: true });
        const description = normalizeString(req.body.description ?? "", "Description");

        if (!title) {
            throw new ApiError(400, "Title cannot be empty");
        }

        if ("completed" in req.body && typeof req.body.completed !== "boolean") {
            throw new ApiError(400, "Completed must be a boolean");
        }

        req.body.title = title;
        req.body.description = description ?? "";

        return next();
    } catch (error) {
        return next(error);
    }
};

export const validateUpdateTodo = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError(400, "Request body is required");
        }

        if ("title" in req.body) {
            const title = normalizeString(req.body.title, "Title", { required: true });

            if (!title) {
                throw new ApiError(400, "Title cannot be empty");
            }

            req.body.title = title;
        }

        if ("description" in req.body) {
            req.body.description = normalizeString(req.body.description, "Description") ?? "";
        }

        if ("completed" in req.body && typeof req.body.completed !== "boolean") {
            throw new ApiError(400, "Completed must be a boolean");
        }

        return next();
    } catch (error) {
        return next(error);
    }
};
