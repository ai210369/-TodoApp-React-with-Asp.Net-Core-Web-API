import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api";
import CreateTask from "./CreateTask";
import { Navigate, useNavigate } from "react-router-dom";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);


    const fetchData = async () => {
        await getTodos()
            .then(resp => {
                setTodos(resp.data);
            })
            .catch(err => {
                console.error("Error loading todos:", err?.response);
            });
    }

    const handleAdd = async (todo) => {
        try {
            await createTodo(todo);
            setValidationErrors("");
            alert("Task Created Sucessfully!")
        } catch (err) {
            if (err.response?.status === 400 && err.response.data?.errors) {
                setValidationErrors(err.response.data.errors);
            } else {
                setValidationErrors("Something went wrong.");
            }
        }
        fetchData();
    };

    const directEdit = async (id) => {
        navigate("/edit/" + id);
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;
        try {
            await deleteTodo(id);
            fetchData();
            alert("Task Deleted!")
        } catch (e) {
            console.error("Error in Deleting:", e)
            alert("Failed to Delete task, Please try it again!")
        }
    }

    const handleToggle = async (todo) => {
        await updateTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted });
        fetchData();
    };


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="container">
            <h1 >Welcome ToDo App</h1>
            <CreateTask onAdd={handleAdd} validationErrors={validationErrors} setValidationErrors={setValidationErrors} />
            <h3>Tasks</h3>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {todos.length > 0 ? (
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id} className={todo.isCompleted ? "completed" : "not-completed"}>
                                <td><input type="checkbox" className="checkbox" checked={todo.isCompleted} onChange={() => handleToggle(todo)} /></td>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => directEdit(todo.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="5">There was no task here</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default TodoList;