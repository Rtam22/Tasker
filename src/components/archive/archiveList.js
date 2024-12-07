import ArchiveItem from "./archiveItem";
import "./archiveList.css";
const ArchiveList = ({
  taskList,
  handleSelect,
  handleSelectAll,
  selectAll,
  selected,
}) => {
  return (
    <div className="archiveList">
      <div className="description archiveItem">
        <input
          value={selectAll}
          type="checkbox"
          onChange={() => handleSelectAll()}
        ></input>
        <p>Title</p>
        <p>Status</p>
        <p>Date Due</p>
      </div>
      {taskList.map((task, index) => {
        return (
          <ArchiveItem
            index={index}
            key={index}
            title={task.title}
            status={task.status}
            dueDate={task.dateDue}
            handleSelect={handleSelect}
            value={selected.find((select) => index === select)}
          />
        );
      })}
    </div>
  );
};

export default ArchiveList;
