import Tasks from "./tasks";
import "./taskList.css";
import { convertDueDate } from "../../utils/dateUtils";
import MobileTask from "./mobileTask";
import { useEffect, useState } from "react";

const TaskList = ({
  tasks,
  onChange,
  selected,
  handleSelectAll,
  checkedAll,
  onCreate,
  onEdit,
}) => {
  const [localSelected, setLocalSelected] = useState([]);
  const selectTask = (index) => {
    onChange(index);
  };

  useEffect(() => {
    if (selected.length === 0) {
      setLocalSelected([]);
    }
  }, [selected]);

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

  const onSelect = (index) => {
    const findSelected = selected.find((task) => task === index);
    if (findSelected + 1) {
      const newArray = selected.filter((item) => item !== index);
      setLocalSelected(newArray);
    } else {
      setLocalSelected([index, ...selected]);
    }
    selectTask(index);
  };

  const onSelectAll = (tasks) => {
    handleSelectAll(tasks);
    let selected = [];
    if (!checkedAll) {
      tasks.forEach((__, index) => {
        selected = [index, ...selected];
      });
      setLocalSelected(selected);
    } else {
      setLocalSelected([]);
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
          onChange={() => onSelect(index)}
          checked={localSelected.includes(index)}
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

  const mapMobileTasks = () => {
    if (tasks?.length > 0) {
      return tasks.map((task, index) => (
        <MobileTask
          key={task.key}
          title={task.title}
          dateDue={handleDueDate(task)}
          status={task.status}
          priority={convertPriority(task.priority)}
          priorityColor={task.priority}
          onChange={() => selectTask(index)}
          checked={localSelected.includes(index)}
          onEdit={onEdit}
          task={task}
        />
      ));
    } else {
      return (
        <button className="createBox mobile" onClick={onCreate}>
          New Task
        </button>
      );
    }
  };

  return (
    <div className="taskList">
      <div className="content">
        <div className="mobileSelectContainer">
          <input
            type="checkbox"
            onChange={() => onSelectAll(tasks)}
            checked={checkedAll}
          ></input>
          <label onClick={() => onSelectAll(tasks)}>Select All</label>
        </div>
        <Tasks
          title="Title"
          dateDue="Due Date"
          status="Status"
          priority="Priority"
          class="description"
          onChange={() => onSelectAll(tasks)}
          checked={checkedAll}
        />
        {mapTasks()}
        {mapMobileTasks()}
      </div>
    </div>
  );
};

export default TaskList;
