import Tasks from "../tasks/tasks";
import "./archiveList.css";
import DateSelection from "./dateSelection";

const ArchiveList = ({ taskList }) => {
  return (
    <div className="archiveList">
      <DateSelection />
      <Tasks
        title="Title"
        dateDue="Due Date"
        status="Status"
        priority="Priority"
        class="description"
      />

      {taskList ? (
        taskList.map((task, index) => {
          return <Tasks key={index} title={task.title} />;
        })
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default ArchiveList;

{
  /* <Tasks
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
/> */
}
