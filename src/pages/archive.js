import TopOptionBar from "../components/navigation/topOptionBar";
import ArchiveList from "../components/archive/archiveList";
import UseTaskOperations from "../hooks/useTaskOperations";
import DateSelection from "../components/archive/dateSelection";
import { useState } from "react";
import "./archive.css";
import { convertDateDDMMYYYY } from "../utils/dateUtils";
import { filterTasksByDate, filterTasksByArchive } from "../utils/filterUtils";

function Archive() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { taskItems } = UseTaskOperations();
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const selectedDate = convertDateDDMMYYYY(currentDate);
  const handleSelect = (index) => {
    const found = selected.find((select) => index === select);
    if (found === 0 || found) {
      const newArray = selected.filter((select) => select !== index);
      setSelected(newArray);
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleSelectAll = () => {
    let newSelectArray = [];
    if (!selectAll) {
      taskItems.forEach((__, index) => {
        newSelectArray = [...newSelectArray, index];
      });
      setSelected(newSelectArray);
    } else {
      setSelected([]);
    }
    setSelectAll(!selectAll);
  };

  const handleFilter = (taskList, date) => {
    if (!taskList) {
      return [];
    }
    return filterTasksByArchive(filterTasksByDate(taskList, date));
  };

  return (
    <div className="content-container archive">
      <TopOptionBar name="Archive" />
      <DateSelection
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
      />
      <ArchiveList
        taskList={handleFilter(taskItems, selectedDate)}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        selected={selected}
      />
    </div>
  );
}

export default Archive;
