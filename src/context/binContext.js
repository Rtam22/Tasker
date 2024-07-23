import React, { createContext, useState, useEffect } from "react";
import {
  saveToLocalStorage,
  LoadUpLocalStorage,
  restoreFromBin,
  addToBin,
  deleteFromBin,
} from "../utils/StorageUtils";

export const BinContext = createContext();

export const BinProvider = ({ children }) => {
  const [binNoteItems, setBinNoteItems] = useState([]);
  const [restoredNotes, setRestoredNotes] = useState([]);
  const [binTaskItems, setbinTaskItems] = useState([]);
  const [restoredTasks, setRestoredTasks] = useState([]);
  const [isLoadedNote, setIsLoadedNote] = useState(false);
  const [isLoadedTask, setIsLoadedTask] = useState(false);
  useEffect(() => {
    const savedTaskContent = LoadUpLocalStorage("binTaskContent");
    const savedNoteContent = LoadUpLocalStorage("binNoteContent");
    if (savedTaskContent) {
      setbinTaskItems(savedTaskContent);
    }
    if (savedNoteContent) {
      setBinNoteItems(savedNoteContent);
    }

    setIsLoadedNote(true);
    setIsLoadedTask(true);
  }, []);

  useEffect(() => {
    if (isLoadedNote) {
      saveToLocalStorage("binNoteContent", binNoteItems);
    }
  }, [binNoteItems, isLoadedNote]);
  useEffect(() => {
    if (isLoadedTask) {
      saveToLocalStorage("binTaskContent", binTaskItems);
    }
  }, [binTaskItems, isLoadedTask]);

  useEffect(() => {
    const restoredNoteContent = LoadUpLocalStorage("restoredNoteContent");
    const restoredTaskContent = LoadUpLocalStorage("restoredTaskContent");
    if (restoredNoteContent) {
      setRestoredNotes(restoredNoteContent);
    }
    if (restoredTaskContent) {
      setRestoredTasks(restoredTaskContent);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("restoredNoteContent", restoredNotes);
  }, [restoredNotes]);
  useEffect(() => {
    saveToLocalStorage("restoredTaskContent", restoredTasks);
  }, [restoredTasks]);

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
