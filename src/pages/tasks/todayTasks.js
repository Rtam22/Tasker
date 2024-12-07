import TaskList from "../../components/tasks/taskList";
import TopOptionBar from "../../components/navigation/topOptionBar";
import UseTaskOperations from "../../hooks/useTaskOperations";
import TaskCreateForm from "../../components/tasks/taskForm";
import { useState } from "react";
import FilterButtons from "../../components/tasks/filterButtons";
import ButtonList from "../../components/tasks/buttonList";
import {
  filterByPriority,
  filteredByDueSoon,
  filterByUnCompleted,
  filterByCompleted,
  filterTasksByToday,
  filterOutArchiveAndDeleted,
} from "../../utils/filterUtils";
function TodayTasks() {
  const {
    taskItems,
    createModal,
    selected,
    selectAll,
    taskToEdit,
    showCreateModal,
    onClose,
    handleCreate,
    handleEdit,
    onSelected,
    handleDelete,
    handleSelectAll,
    handleArchive,
  } = UseTaskOperations();

  const [filter, setFilter] = useState("");

  const filterTasks = (filterType) => {
    setFilter(filterType);
    filteredTaskList();
  };

  const filteredTaskList = () => {
    const tasksDueToday = filterTasksByToday(taskItems);
    switch (filter) {
      case "highPriority":
        return filterByPriority(tasksDueToday);
      case "dueSoon":
        return filteredByDueSoon(tasksDueToday);
      case "unCompleted":
        return filterByUnCompleted(tasksDueToday);
      case "completed":
        return filterByCompleted(tasksDueToday);
      default:
        return tasksDueToday;
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
        tasks={filterOutArchiveAndDeleted(filteredTaskList())}
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

export default TodayTasks;
