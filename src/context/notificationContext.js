import { createContext, useContext, useEffect } from "react";
import { TaskContext } from "./taskContext";
import { convertDueByHours, getDateDDMMYYYY } from "../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { taskItems, changeNotified } = useContext(TaskContext);
  const [notifications, setNotification] = useLocalStorage(
    "notificationsContent",
    []
  );

  const addNotification = (task, timeLeft, type) => {
    const taskData = {
      key: uuidv4(),
      taskey: task.key,
      title: task.title,
      dateDue: task.dateDue,
      dueIn: timeLeft,
      priority: task.priority,
      type: type,
      notifiedDate: getDateDDMMYYYY(),
    };

    setNotification((prevNotification) => [taskData, ...prevNotification]);
  };

  const removeNotification = (notificationKey) => {
    const newArray = notifications
      .map((item) => (item.key === notificationKey ? null : item))
      .filter((value) => value !== null);
    setNotification(newArray);
  };

  const markNotified = (taskKey, type, status) => {
    const newArray = taskItems.map((task) =>
      taskKey === task.key
        ? { ...task, notified: { ...task.notified, [type]: status } }
        : task
    );
    return newArray;
  };

  const checkTaskDates = () => {
    if (!taskItems) {
      return;
    }
    taskItems.forEach((task) => {
      if (task.isArchived === true || task.isDeleted === true) {
        return;
      }
      console.log(task);
      const taskHoursDue = convertDueByHours(task.dateDue);
      if (taskHoursDue < 24 && !task.notified.dueSoon) {
        addNotification(task, taskHoursDue, "dueSoon");
        changeNotified(markNotified(task.key, "dueSoon", true));
      } else if (taskHoursDue <= 0 && !task.notified.overDue) {
        addNotification(task, taskHoursDue, "overDue");
        changeNotified(markNotified(task.key, "overDue", true));
      }
    });
  };

  const updateDueTime = () => {
    setNotification((prevNotifications) => {
      const newTaskItems = prevNotifications
        .map((item) => {
          if (item.type === "overDue") {
            return item;
          }
          const dueHours = convertDueByHours(item.dateDue);
          if (dueHours > 0) {
            item.dueIn = dueHours;
            return item;
          } else {
            return;
          }
        })
        .filter((item) => item);
      return newTaskItems;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTaskDates();
      updateDueTime();
    }, 10000);
    return () => clearInterval(interval);
  }, [taskItems]);

  return (
    <NotificationContext.Provider value={{ notifications, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
