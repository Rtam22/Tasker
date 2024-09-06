import React, { createContext, useState, useEffect, useContext } from "react";
import { LoadUpLocalStorage, saveToLocalStorage } from "../utils/StorageUtils";
import { BinContext } from "./binContext";
import { convertDueByDays, convertDueByHours } from "../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";
import {
  setInitialDate,
  getDateDaysFromToday,
  getDateDDMMYYYY,
} from "../utils/dateUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const TaskContext = createContext();

const initialTasks = [
  {
    key: uuidv4(),
    title: "Complete Project Report",
    description:
      "Finish the final report for the project and submit it to the manager.",
    dateDue: setInitialDate(getDateDaysFromToday(5)),
    dateCreated: getDateDDMMYYYY(),
    dateDeleted: "",
    notified: { dueSoon: false, overDue: false },
    status: "In Progress",
    priority: "4",
  },
  {
    key: uuidv4(),
    title: "Schedule Doctor's Appointment",
    description: "Call the clinic to schedule a routine check-up appointment.",
    dateDue: setInitialDate(getDateDaysFromToday(1)),
    dateCreated: getDateDDMMYYYY(),
    dateDeleted: "",
    status: "Pending",
    priority: "1",
    notified: { dueSoon: false, overDue: false },
  },
  {
    key: uuidv4(),
    title: "Team Meeting",
    description:
      "Join the weekly team meeting to discuss project updates and plans.",
    dateDue: setInitialDate(getDateDaysFromToday(2)),
    dateCreated: getDateDDMMYYYY(),
    dateDeleted: "",
    status: "Pending",
    priority: "3",
    notified: { dueSoon: false, overDue: false },
  },
  {
    key: uuidv4(),
    title: "Buy Groceries",
    description:
      "Purchase milk, eggs, bread, and fruit from the grocery store.",
    dateDue: setInitialDate(getDateDaysFromToday(7)),
    dateCreated: getDateDDMMYYYY(),
    dateDeleted: "",
    status: "Pending",
    priority: "2",
    notified: { dueSoon: false, overDue: false },
  },
  {
    key: uuidv4(),
    title: "Read a Book",
    description:
      "Read at least 50 pages of 'The Great Gatsby' by F. Scott Fitzgerald.",
    dateDue: setInitialDate(getDateDaysFromToday(10)),
    dateCreated: getDateDDMMYYYY(),
    dateDeleted: "",
    status: "Pending",
    priority: "1",
    notified: { dueSoon: false, overDue: false },
  },
];

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

  const changeWeekCount = () => {
    if (!taskItems) {
      return;
    }
    const filteredTasks = taskItems.filter(
      (task) => convertDueByDays(task.dateDue) < 7
    );
    setWeekCount(filteredTasks.length);
  };

  const changedayCount = () => {
    if (!taskItems) {
      return;
    }
    const filteredTasks = taskItems.filter(
      (task) => convertDueByHours(task.dateDue) < 24
    );
    setTodayCount(filteredTasks.length);
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
        changeNotified,
        todayCount,
        weekCount,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
