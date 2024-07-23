import { useEffect, useState } from "react";
import "./taskForm.css";
import { getDateDDMMYYYY, convertToYYYYMMDD } from "../../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";
import { convertDueByHours } from "../../utils/dateUtils";

const TaskCreateForm = ({ onClose, TaskSubmit, mode, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDate(convertToYYYYMMDD(task.dateDue) || "");
      setStatus(task.status || "");
      setPriority(task.priority || "");
    }
  }, [mode, task]);

  const hideTaskForm = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dueDateTime = convertDueByHours(date.split("-").reverse().join("/"));
    const data = {
      key: mode === "edit" ? task.key : uuidv4(),
      title: title,
      description: description,
      dateDue: date.split("-").reverse().join("/"),
      dateCreated: mode === "edit" ? task.dateCreated : getDateDDMMYYYY(),
      dateDeleted: mode === "edit" ? task.dateDeleted : "",
      notified: {
        dueSoon: dueDateTime < 24 ? true : false,
        overDue: false,
      },
      status: status,
      priority: priority,
    };
    TaskSubmit(data);
    onClose();
  };

  return (
    <div className="createTaskForm" id="taskForm">
      <div className="modal">
        <div className="modalTitle">
          <h2>Create Task</h2>
        </div>
        <div className="formContainer">
          <form className="taskForm" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </fieldset>
            <fieldset>
              <label htmlFor="due-date">Due Date</label>
              <input
                type="date"
                id="due-date"
                name="due-date"
                required
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                required
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
              >
                <option value="">Select priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Important</option>
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                required
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">Select status</option>
                <option value="To Do">To do</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </fieldset>
            <div className="formButtonContainer">
              <button className="cancel" onClick={hideTaskForm}>
                Cancel
              </button>
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modalBackground" onClick={hideTaskForm}></div>
    </div>
  );
};

export default TaskCreateForm;
