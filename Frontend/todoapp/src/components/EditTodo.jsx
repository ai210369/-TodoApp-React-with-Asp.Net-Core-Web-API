import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTodoById, updateTodo } from "../api";

function EditTodo() {
    const { taskid } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const fetchData = async () => {
        const resp = await getTodoById(taskid);
        setTitle(resp.data.title);
        setDescription(resp.data.description);
        setIsCompleted(resp.data.isCompleted)
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const updatedTodo = { id: parseInt(taskid), title, description, isCompleted };
        try {
            await updateTodo(taskid, updatedTodo);
            alert("Task Updated Successfully!")

        } catch (err) {
            if (err.response?.status === 400 && err.response.data?.errors) {
                setValidationErrors(err.response.data.errors);
            } else {
                setValidationErrors("Something went wrong.");
            }
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="form-container">
            <form className="edit-container" onSubmit={handleEdit}>
                <h2>Edit Task</h2>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => { 
                    setTitle(e.target.value); 
                    setValidationErrors({}); 
                }} />
                {validationErrors?.Title && (
                    <span>{validationErrors.Title[0]}</span>
                )}
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows={5} cols={40} value={description} onChange={(e) => { 
                    setDescription(e.target.value); 
                    setValidationErrors({});
                }}></textarea>
                {validationErrors?.Description && (
                    <span>{validationErrors.Description[0]}</span>
                )}
                <div className="status-checkbox">
                    <input type="checkbox" id="isCompleted" name="isCompleted" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
                    <h4>Task Completed</h4>
                </div>



                <div className="btn-container">
                    <button type="submit" className="btn btn-info">Save</button>
                    <Link to="/" className="btn btn-danger">Back</Link>
                </div>
            </form>
        </div>
    );
}

export default EditTodo;
