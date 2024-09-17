import NavigationBar from "../../components/navigation/navigationBar";
import TaskList from "../../components/tasks/taskList";
import TopOptionBar from "../../components/navigation/topOptionBar";
import UseTaskOperations from "../../hooks/useTaskOperations";
import TaskCreateForm from "../../components/tasks/taskForm";
import { convertDueByDays } from "../../utils/dateUtils";
import { TaskContext } from "../../context/taskContext";
import ButtonList from "../../components/tasks/buttonList";
import FilterButtons from "../../components/tasks/filterButtons";
import { useState } from "react";
import {
  filterByPriority,
  filteredByDueSoon,
  filterByUnCompleted,
  filterByCompleted,
  filterTasksByWeek,
} from "../../utils/filterUtils";

function WeekTasks() {
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
  } = UseTaskOperations();

  const [filter, setFilter] = useState("");

  const filterTasks = (filterType) => {
    setFilter(filterType);
    filteredTaskList();
  };

  const filteredTaskList = () => {
    const tasksDueInWeek = filterTasksByWeek(taskItems);
    switch (filter) {
      case "highPriority":
        return filterByPriority(tasksDueInWeek);
      case "dueSoon":
        return filteredByDueSoon(tasksDueInWeek);
      case "unCompleted":
        return filterByUnCompleted(tasksDueInWeek);
      case "completed":
        return filterByCompleted(tasksDueInWeek);
      default:
        return tasksDueInWeek;
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

export default WeekTasks;
