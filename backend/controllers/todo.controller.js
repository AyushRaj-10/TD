import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.json(todos);
};

export const getTodo = async (req, res) => {

    const todo = await Todo.findById(req.params.id);

    if (!todo)
        return res.status(404).json({
            message: "Todo not found"
        });

    res.json(todo);

};

export const createTodo = async (req, res) => {

    const todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
    });

    res.status(201).json(todo);

};

export const updateTodo = async (req, res) => {

    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    if (!todo)
        return res.status(404).json({
            message: "Todo not found"
        });

    res.json(todo);

};

export const deleteTodo = async (req, res) => {

    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo)
        return res.status(404).json({
            message: "Todo not found"
        });

    res.json({
        message: "Todo deleted"
    });

};