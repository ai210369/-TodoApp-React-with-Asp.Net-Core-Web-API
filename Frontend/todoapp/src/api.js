import axios from "axios";

const API_URL = "http://localhost:5224/api/Todo";
export const getTodos = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const getTodoById = (id) => axios.get(`${API_URL}/${id}`);
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
