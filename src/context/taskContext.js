import React, { createContext, useState, useEffect, useContext } from "react";
import { BinContext } from "./binContext";
import { convertDueByDays, convertDueByHours } from "../utils/dateUtils";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialTasks } from "../data/tasksData";
import { filterOutArchiveAndDeleted } from "../utils/filterUtils";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskItems, setTaskItems] = useLocalStorage(
    "taskContent",
    initialTasks
  );
  const [todayCount, setTodayCount] = useState();
  const [weekCount, setWeekCount] = useState();

  const { restoredTasks, clearRestoredTasks } = useContext(BinContext) ?? {};

  useEffect(() => {
    if (restoredTasks.length > 0) {
      setTaskItems([...restoredTasks, ...taskItems]);
      clearRestoredTasks();
    }
  }, [restoredTasks, clearRestoredTasks, taskItems]);

  useEffect(() => {
    changeWeekCount();
    changedayCount();
  }, [taskItems]);

  const createTask = (data) => {
    taskItems ? setTaskItems([data, ...taskItems]) : setTaskItems([data]);
  };

  const editTask = (data) => {
    const updatedArray = taskItems.map((task) => {
      if (task.key === data.key) {
        return data;
      } else {
        return task;
      }
    });
    setTaskItems(updatedArray);
  };

  const deleteTask = (deletedArray) => {
    const draftArray = [...taskItems];
    let newTaskArray = draftArray.filter((task) => {
      return !deletedArray.some((delTask) => task.key === delTask.key);
    });
    setTaskItems(newTaskArray);
  };

  const archiveTask = (archivedArray) => {
    const newTaskArray = taskItems.map((task) => {
      const found = archivedArray.find(
        (taskArchived) => task.key === taskArchived.key
      );
      if (found) {
        task.isArchived = true;
        if (task.status != "Completed") {
          task.status = "Incomplete";
        }
      }
      return task;
    });
    setTaskItems(newTaskArray);
  };

  const changeWeekCount = () => {
    if (!taskItems) {
      return;
    }
    const filteredTasks = taskItems.filter(
      (task) => convertDueByDays(task.dateDue) < 7
    );
    setWeekCount(filterOutArchiveAndDeleted(filteredTasks).length);
  };

  const changedayCount = () => {
    if (!taskItems) {
      return;
    }
    const filteredTasks = taskItems.filter(
      (task) => convertDueByHours(task.dateDue) < 24
    );
    setTodayCount(filterOutArchiveAndDeleted(filteredTasks).length);
  };

  const changeNotified = (updatedArray) => {
    setTaskItems(updatedArray);
  };

  return (
    <TaskContext.Provider
      value={{
        taskItems,
        createTask,
        editTask,
        deleteTask,
        archiveTask,
        changeNotified,
        todayCount,
        weekCount,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
