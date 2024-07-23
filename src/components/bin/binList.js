import { useState, useContext } from "react";
import BinItem from "./binItem";
import "./binList.css";
import { BinContext } from "../../context/binContext";

function BinList() {
  const [checkSelected, setCheckSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [binType, setBinType] = useState("notes");
  const {
    binNoteItems,
    deleteNotesFromBin,
    restoreNotesFromBin,
    binTaskItems,
    restoreTasksFromBin,
    deleteTasksFromBin,
  } = useContext(BinContext) ?? {};

  const handleDelete = () => {
    if (binType === "notes") {
      deleteNotesFromBin(checkSelected);
    } else if (binType === "tasks") {
      deleteTasksFromBin(checkSelected);
    }

    setCheckSelected([]);
    setSelectAll(false);
  };

  const handleChange = (index) => {
    const findItem = checkSelected.filter((i) => i === index);
    let tempSelectedArray = [];
    if (findItem.length > 0) {
      tempSelectedArray = checkSelected.filter((i) => index !== i);
    } else {
      tempSelectedArray = [index, ...checkSelected];
    }
    setCheckSelected(tempSelectedArray);
  };

  const handleSelectAll = () => {
    let index;
    if (selectAll) {
      setCheckSelected([]);
    } else {
      binType === "notes"
        ? (index = binNoteItems.map((_, i) => i))
        : (index = binTaskItems.map((_, i) => i));
      setCheckSelected(index);
    }
    setSelectAll(!selectAll);
  };

  const handleRestore = () => {
    if (checkSelected.length < 1) {
      alert("Please select items to restore");
      return;
    }
    if (binType === "notes") {
      restoreNotesFromBin(checkSelected);
    } else if (binType === "tasks") {
      restoreTasksFromBin(checkSelected);
    }
    setCheckSelected([]);
    setSelectAll(false);
  };

  const showNoteBin = () => {
    return (
      <div className="content">
        <BinItem
          class="description"
          name="Content"
          col1="Created on"
          col2="Deleted on"
          handleChange={handleSelectAll}
          checked={selectAll}
        />
        {binNoteItems.map((item, index) => {
          return (
            <BinItem
              key={item.id}
              name={item.content}
              handleChange={() => handleChange(index)}
              col1={item["date created"]}
              col2={item["date deleted"]}
              checked={checkSelected.includes(index)}
            />
          );
        })}
      </div>
    );
  };

  const showTaskBin = () => {
    return (
      <div className="content">
        <BinItem
          key="descripion"
          class="description"
          name="Title"
          col1="Due Date"
          col2="Deleted on"
          handleChange={handleSelectAll}
          checked={selectAll}
        />
        {binTaskItems.map((item, index) => {
          return (
            <BinItem
              key={item.key}
              name={item.title}
              handleChange={() => handleChange(index)}
              col1={item.dateDue}
              col2={item.dateDeleted}
              checked={checkSelected.includes(index)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="binList">
      <div className="buttonContainer">
        <div className="left">
          <button className="buttonSimple" onClick={() => setBinType("notes")}>
            Notes
          </button>
          <button className="buttonSimple" onClick={() => setBinType("tasks")}>
            Tasks
          </button>
        </div>
        <div className="right">
          <button className="buttonSimple" onClick={handleRestore}>
            Restore
          </button>
          <span className="separator">|</span>
          <button className="buttonSimple" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      {binType === "notes" ? showNoteBin() : showTaskBin()}
    </div>
  );
}

export default BinList;
