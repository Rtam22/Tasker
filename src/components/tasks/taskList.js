import Tasks from "./tasks";
import "./taskList.css";
import { convertDueDate } from "../../utils/dateUtils";

const TaskList = ({
  tasks,
  onChange,
  selected,
  handleSelectAll,
  checkedAll,
  onCreate,
  onEdit,
}) => {
  const selectTask = (index) => {
    onChange(index);
  };

  const handleDueDate = (task) => {
    return convertDueDate(task.dateDue);
  };

  const convertPriority = (priority) => {
    switch (priority) {
      case "1": {
        return "Low";
      }
      case "2": {
        return "Medium";
      }
      case "3": {
        return "High";
      }
      case "4": {
        return "Important";
      }
      default: {
        return;
      }
    }
  };

  const mapTasks = () => {
    if (tasks?.length > 0) {
      return tasks.map((task, index) => (
        <Tasks
          key={task.key}
          title={task.title}
          dateDue={handleDueDate(task)}
          status={task.status}
          priority={convertPriority(task.priority)}
          priorityColor={task.priority}
          onChange={() => selectTask(index)}
          checked={selected.includes(index)}
          onEdit={onEdit}
          task={task}
        />
      ));
    } else {
      return (
        <button className="createBox" onClick={onCreate}>
          New Task
        </button>
      );
    }
  };

  return (
    <div className="taskList">
      <div className="content">
        <Tasks
          title="Title"
          dateDue="Due Date"
          status="Status"
          priority="Priority"
          class="description"
          onChange={handleSelectAll}
          checked={checkedAll}
        />
        {mapTasks()}
      </div>
    </div>
  );
};

export default TaskList;
