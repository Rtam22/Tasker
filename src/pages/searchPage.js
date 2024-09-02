import { useContext, useEffect, useState } from "react";
import TopOptionBar from "../components/navigation/topOptionBar";
import { useSearchParams } from "react-router-dom";
import { TaskContext } from "../context/taskContext";
import TaskList from "../components/tasks/taskList";
import UseTaskOperations from "../hooks/useTaskOperations";
import TaskCreateForm from "../components/tasks/taskForm";

import "./searchPage.css";
const SearchPage = () => {
  const { taskItems } = useContext(TaskContext);
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [isLoaded, setIsLoaded] = useState(false);
  const {
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

  useEffect(() => {
    if (!taskItems || taskItems.length === 0) {
      return;
    }
    setIsLoaded(true);
  }, [taskItems]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (query) {
      const querySplit = query.toLowerCase().split(" ");
      const result = taskItems
        .map((item) => {
          const itemTitle = item.title.toLowerCase();
          const matchCount = querySplit.reduce((count, param) => {
            return itemTitle.includes(param) ? count + 1 : count;
          }, 0);

          return { item, matchCount };
        })
        .sort((a, b) => b.matchCount - a.matchCount)
        .filter((item) => item.matchCount > 0);
      setSearchResult(result.map((task) => task.item));
    }
  }, [taskItems, isLoaded, query]);

  {
    !isLoaded && <p>Is Loading</p>;
  }

  return (
    <div className="content-container">
      <TopOptionBar name="Search" />
      {searchResult.length > 0 ? (
        <>
          <div className="filter-container"></div>
          <TaskList
            tasks={searchResult}
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
        </>
      ) : (
        <div className="content search">
          <p>Could not find '{query}'</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
