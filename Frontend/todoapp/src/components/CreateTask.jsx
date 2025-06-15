import { useState } from "react";

function CreateTask({ onAdd, validationErrors, setValidationErrors }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSaved = (e) => {
        e.preventDefault();
        try {
            onAdd({ title, description, isCompleted: false });
            if (!title.trim()) return;
            setTitle("");
            setDescription("");
        } catch (err) {
            alert("Failed to Save task, Please Create it Later again!")
        }
    };

    return (
        <div className="create-container">
            <h3>Create New Task</h3>
            <form onSubmit={handleSaved}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => {
                    setTitle(e.target.value);
                    setValidationErrors({});
                }}
                    placeholder="Enter Your Title..."></input>
                {validationErrors?.Title && (
                    <span>{validationErrors.Title[0]}</span>
                )}
                <br></br>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows={5} cols={40} value={description} onChange={(e) => {
                    setDescription(e.target.value);
                    setValidationErrors({});
                }}
                    placeholder="Enter Your Description..."></textarea>
                {validationErrors?.Description && (
                    <span>{validationErrors.Description[0]}</span>
                )}
                <div className="btn-container">
                    <button type="submit" className="btn btn-info">Save</button></div>
            </form>
        </div>
    );
}

export default CreateTask;