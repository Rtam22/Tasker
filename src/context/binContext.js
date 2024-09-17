import React, { createContext, useState, useEffect } from "react";
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

  const addToBin = (item, bin) => {
    return [item, ...bin];
  };

  const deleteFromBin = (index, bin) => {
    if (index.length === 1) {
      const newBin = bin.filter((_, i) => i !== index[0]);
      return newBin;
    } else {
      index.sort((a, b) => b - a);
      let tempBinArray = [...bin];
      index.forEach((i) => {
        tempBinArray.splice(i, 1);
      });
      return tempBinArray;
    }
  };

  const restoreFromBin = (index, bin, restored) => {
    const tempbinArray = [...bin];
    let restoredItem = [];
    index
      .sort((a, b) => b - a)
      .forEach((i) => {
        restoredItem.push(tempbinArray.splice(i, 1)[0]);
      });
    return { bin: tempbinArray, restored: [...restoredItem, ...restored] };
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
