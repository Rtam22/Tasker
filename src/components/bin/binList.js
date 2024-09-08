import { useState, useContext } from "react";
import BinItem from "./binItem";
import "./binList.css";
import { BinContext } from "../../context/binContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import MobileTask from "../tasks/mobileTask";
function BinList() {
  const [checkSelected, setCheckSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [binType, setBinType] = useState("tasks");
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

  const handleBinFilter = (type) => {
    setSelectAll(false);
    setCheckSelected([]);
    setBinType(type);
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
        <div className="mobileSelectContainer">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectAll}
          ></input>
          <label onClick={handleSelectAll}>Select All</label>
        </div>
        {binNoteItems.length > 0 ? (
          <>
            <div className="binItemList">
              {binNoteItems.map((item, index) => (
                <BinItem
                  key={item.id}
                  name={item.content}
                  handleChange={() => handleChange(index)}
                  col1={item["date created"]}
                  col2={item["date deleted"]}
                  checked={checkSelected.includes(index)}
                />
              ))}
            </div>
            <div className="mobileBinItems">
              {binNoteItems.map((item, index) => (
                <MobileTask
                  key={item.id}
                  title={item.content}
                  type="bin"
                  selectAll={selectAll}
                  checked={checkSelected.includes(index)}
                  onChange={() => handleChange(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-container">
            <FontAwesomeIcon className="emptyIcon" icon={faTrash} />
            <p>Notes bin is empty</p>
          </div>
        )}
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
        <div className="mobileSelectContainer">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectAll}
          ></input>
          <label onClick={handleSelectAll}>Select All</label>
        </div>
        {binTaskItems.length > 0 ? (
          <>
            <div className="binItemList">
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

            <div className="mobileBinItems">
              {binTaskItems.map((item, index) => {
                return (
                  <MobileTask
                    key={item.key}
                    title={item.title}
                    type="bin"
                    dateDue={item.dateDue}
                    deletedOn={item.dateDeleted}
                    selectAll={selectAll}
                    checked={checkSelected.includes(index)}
                    onChange={() => handleChange(index)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="empty-container">
            <FontAwesomeIcon className="emptyIcon" icon={faTrash} />
            <p>Task bin is empty</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="binList">
      <div className="buttonContainer">
        <div className="left">
          <button
            className={`filterButton ${binType === "tasks" ? "active" : ""}`}
            onClick={() => handleBinFilter("tasks")}
          >
            Tasks
          </button>
          <button
            className={`filterButton ${binType === "notes" ? "active" : ""}`}
            onClick={() => handleBinFilter("notes")}
          >
            Notes
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
