import React, { createContext, useState, useEffect } from "react";
import { restoreFromBin, addToBin, deleteFromBin } from "../utils/StorageUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const BinContext = createContext();

export const BinProvider = ({ children }) => {
  const [binNoteItems, setBinNoteItems] = useLocalStorage("binNoteContent", []);
  const [restoredNotes, setRestoredNotes] = useLocalStorage(
    "restoredNoteContent",
    []
  );
  const [binTaskItems, setbinTaskItems] = useLocalStorage("binTaskContent", []);
  const [restoredTasks, setRestoredTasks] = useLocalStorage(
    "restoredTaskContent",
    []
  );

  const addNoteToBin = (item) => setBinNoteItems(addToBin(item, binNoteItems));

  const deleteNotesFromBin = (index) => {
    if (index.length <= 0) {
      alert("Please select items to delete");
      return;
    } else {
      setBinNoteItems(deleteFromBin(index, binNoteItems));
    }
  };

  const clearRestoredNotes = () => {
    setRestoredNotes([]);
  };

  const restoreNotesFromBin = (index) => {
    const { bin, restored } = restoreFromBin(
      index,
      binNoteItems,
      restoredNotes
    );
    setRestoredNotes(restored);
    setBinNoteItems(bin);
  };

  const addTaskToBin = (items) => {
    setbinTaskItems([...items, ...binTaskItems]);
  };

  const deleteTasksFromBin = (index) => {
    if (index.length <= 0) {
      alert("Please select items to delete");
      return;
    } else {
      setbinTaskItems(deleteFromBin(index, binTaskItems));
    }
  };

  const clearRestoredTasks = () => {
    setRestoredTasks([]);
  };

  const restoreTasksFromBin = (index) => {
    const { bin, restored } = restoreFromBin(
      index,
      binTaskItems,
      restoredTasks
    );
    setRestoredTasks(restored);
    setbinTaskItems(bin);
  };

  return (
    <BinContext.Provider
      value={{
        binNoteItems,
        restoredNotes,
        addNoteToBin,
        deleteNotesFromBin,
        restoreNotesFromBin,
        clearRestoredNotes,
        binTaskItems,
        restoredTasks,
        addTaskToBin,
        deleteTasksFromBin,
        clearRestoredTasks,
        restoreTasksFromBin,
      }}
    >
      {children}
    </BinContext.Provider>
  );
};
