import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = async () => {
  const response = await API.get("/");

  return response.data;
};

export const getTodo = async (id) => {
  const response = await API.get(`/${id}`);

  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await API.post("/", todoData);

  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await API.put(`/${id}`, todoData);

  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await API.delete(`/${id}`);

  return response.data;
};
