import TaskList from "../../components/tasks/taskList";
import TopOptionBar from "../../components/navigation/topOptionBar";
import "./allTasks.css";
import TaskCreateForm from "../../components/tasks/taskForm";
import UseTaskOperations from "../../hooks/useTaskOperations";
import { TaskContext } from "../../context/taskContext";
import ButtonList from "../../components/tasks/buttonList";
import FilterButtons from "../../components/tasks/filterButtons";
import { useState } from "react";
import { convertDueByHours } from "../../utils/dateUtils";
import {
  filterByPriority,
  filteredByDueSoon,
  filterByUnCompleted,
  filterByCompleted,
} from "../../utils/filterUtils";
function AllTasks() {
  const {
    taskItems,
    createModal,
    taskToEdit,
    selected,
    selectAll,
    showCreateModal,
    onClose,
    handleCreate,
    onSelected,
    handleDelete,
    handleSelectAll,
    handleEdit,
    handleArchive,
  } = UseTaskOperations();

  const [filter, setFilter] = useState("");

  const filterTasks = (filterType) => {
    setFilter(filterType);
    filteredTaskList();
  };

  const filterOutArchiveAndDeleted = (taskItemList) => {
    const result = taskItemList.filter((item) => {
      if (!item.isArchived && !item.isDeleted) {
        return item;
      }
    });
    return result;
  };

  const filteredTaskList = () => {
    const taskItemList = filterOutArchiveAndDeleted(taskItems);
    switch (filter) {
      case "highPriority":
        return filterByPriority(taskItemList);
      case "dueSoon":
        return filteredByDueSoon(taskItemList);
      case "unCompleted":
        return filterByUnCompleted(taskItemList);
      case "completed":
        return filterByCompleted(taskItemList);
      default:
        return taskItemList;
    }
  };

  return (
    <div className="content-container">
      <TopOptionBar name="Tasks" />
      <div className="list">
        <div className="buttonContainer">
          <FilterButtons filterTasks={filterTasks} filter={filter} />
          <ButtonList
            handleDelete={handleDelete}
            showCreateModal={showCreateModal}
            taskItems={filteredTaskList()}
            handleArchive={handleArchive}
          />
        </div>
      </div>
      <TaskList
        tasks={filteredTaskList()}
        onChange={onSelected}
        selected={selected}
        handleSelectAll={handleSelectAll}
        checkedAll={selectAll}
        onCreate={showCreateModal}
        onEdit={showCreateModal}
      />
      {createModal && (
        <TaskCreateForm
          mode={createModal}
          create={true}
          onClose={onClose}
          TaskSubmit={createModal === "view" ? handleEdit : handleCreate}
          handleEdit={handleEdit}
          task={createModal === "view" ? taskToEdit : null}
        />
      )}
    </div>
  );
}

export default AllTasks;
