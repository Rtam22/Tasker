export const getDateDDMMYYYY = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

export const convertDateDDMMYYYY = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDateDaysFromToday = (days) => {
  if (days == null) {
    return;
  }
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};

export const getDateMonthsFromToday = (months) => {
  if (months == null) {
    return;
  }
  const result = new Date();
  result.setDate(result.getMonth() + months);
  return result;
};

export const setInitialDate = (date) => {
  if (!date) {
    return;
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDaysInMonth = (year, month) => {
  if (year == null || month == null) {
    return;
  }
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthName = (date) => {
  if (!date) {
    return;
  }
  return date.toLocaleString("default", { month: "long" });
};

export const convertDueDate = (date) => {
  if (!date) {
    return;
  }
  const currentDate = new Date();
  const [day, month, year] = date.split("/").map(Number);
  const dueDate = new Date(year, month - 1, day);
  const differenceInMillis = dueDate - currentDate;
  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24)
  );
  const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
  const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
  if (differenceInDays > 0) {
    return `${differenceInDays} days`;
  } else if (differenceInHours > 0) {
    return `${differenceInHours} hours`;
  } else if (differenceInMinutes > 0) {
    return `${differenceInMinutes} minutes`;
  } else {
    return "OverDue";
  }
};

export const convertDueByHours = (task) => {
  if (!task) {
    return;
  }
  const currentDate = new Date();
  const [day, month, year] = task.split("/").map(Number);
  const dueDate = new Date(year, month - 1, day);
  const differenceInMillis = dueDate - currentDate;
  const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
  return differenceInHours;
};

export const convertDueByDays = (task) => {
  if (!task) {
    return;
  }
  const currentDate = new Date();
  const [day, month, year] = task.split("/").map(Number);
  const dueDate = new Date(year, month - 1, day);
  const differenceInMillis = dueDate - currentDate;
  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
};

export const convertToYYYYMMDD = (date) => {
  if (!date) {
    return;
  }
  return date.split("/").reverse().join("-");
};
