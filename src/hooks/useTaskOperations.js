import { useState, useContext } from "react";
import { BinContext } from "../context/binContext";
import { TaskContext } from "../context/taskContext";
import { getDateDDMMYYYY } from "../utils/dateUtils";

const UseTaskOperations = () => {
  const [createModal, setCreateModal] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { addTaskToBin } = useContext(BinContext) ?? {};
  const { taskItems, createTask, editTask, deleteTask, archiveTask } =
    useContext(TaskContext) ?? {};

  const showCreateModal = (mode, task) => {
    setCreateModal(mode);
    task && setTaskToEdit(task);
  };

  const onClose = () => {
    setCreateModal("");
    setTaskToEdit("");
  };

  const handleCreate = (task) => {
    createTask(task);
  };

  const handleEdit = (task) => {
    editTask(task);
  };

  const onSelected = (index) => {
    const findSelected = selected.find((task) => task === index);
    if (findSelected + 1) {
      const newArray = selected.filter((item) => item !== index);
      setSelected(newArray);
    } else {
      setSelected([index, ...selected]);
    }
  };

  const handleDelete = (tasks) => {
    if (selected.length < 1) {
      alert("Please select a task to delete");
      setSelectAll(false);
      return;
    }
    const deletedArray = tasks.filter((_, index) => selected.includes(index));
    deletedArray.forEach((item) => {
      item.dateDeleted = getDateDDMMYYYY();
    });
    deleteTask(deletedArray);
    addTaskToBin(deletedArray);
    setSelected([]);
    setSelectAll(false);
  };

  const handleArchive = (tasks) => {
    if (tasks.length < 1) {
      alert("Please select a task to archive");
      setSelectAll(false);
      return;
    }
    const archivedArray = tasks.filter((_, index) => selected.includes(index));
    archiveTask(archivedArray);
    setSelected([]);
    setSelectAll(false);
  };

  const handleSelectAll = (tasks) => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      const index = taskItems
        .map((mainTasks, index) => {
          const result = tasks.find((task) => task.key === mainTasks.key);

          if (result) {
            return index;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
      setSelected(index);
      setSelectAll(true);
    }
  };
  return {
    taskItems,
    createModal,
    selected,
    selectAll,
    taskToEdit,
    showCreateModal,
    onClose,
    handleCreate,
    onSelected,
    handleDelete,
    handleSelectAll,
    handleEdit,
    handleArchive,
  };
};

export default UseTaskOperations;
