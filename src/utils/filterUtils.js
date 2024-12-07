import { convertDueByHours, convertDueByDays } from "./dateUtils";

export const filterByPriority = (List) => {
  return List.slice().sort((a, b) => {
    return b.priority - a.priority;
  });
};

export const filteredByDueSoon = (list) => {
  return list.slice().sort((a, b) => {
    const aDue = convertDueByHours(a.dateDue);
    const bDue = convertDueByHours(b.dateDue);
    if (aDue < bDue) {
      return -1;
    } else if (aDue > bDue) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const filterByUnCompleted = (list) => {
  return list.filter((item) => item.status !== "Completed");
};

export const filterByCompleted = (list) => {
  return list.filter((item) => item.status === "Completed");
};

export const filterTasksByWeek = (list) => {
  if (list) {
    const filteredTasks = list.filter(
      (task) => convertDueByDays(task.dateDue) < 7
    );
    return filteredTasks;
  }
};

export const filterTasksByToday = (list) => {
  if (list) {
    const filteredTasks = list.filter(
      (task) => convertDueByHours(task.dateDue) < 24
    );
    return filteredTasks;
  }
};

export const filterOutArchiveAndDeleted = (taskItemList) => {
  const result = taskItemList.filter((item) => {
    if (!item.isArchived && !item.isDeleted) {
      return item;
    }
  });
  return result;
};

export const filterTasksByDate = (taskList, date) => {
  return taskList.filter((task) => task.dateDue.slice(3) === date.slice(3));
};

export const filterTasksByArchive = (taskList) => {
  return taskList.filter((task) => task.isArchived === true);
};
