import TopOptionBar from "../components/navigation/topOptionBar";
import ArchiveList from "../components/archive/archiveList";
import UseTaskOperations from "../hooks/useTaskOperations";

function Archive() {
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

  const filterArchiveTasks = (array) => {
    return array.filter((item) => item.isArchived === true);
  };

  return (
    <div className="content-container">
      <TopOptionBar name="Archive" />
      <ArchiveList taskList={taskItems} />
    </div>
  );
}

export default Archive;
