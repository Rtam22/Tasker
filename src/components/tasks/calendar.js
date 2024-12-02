import "./calendar.css";
import { useState, useContext } from "react";
import { getDaysInMonth, getMonthName } from "../../utils/dateUtils";
import { TaskContext } from "../../context/taskContext";
import TaskCreateForm from "./taskForm";
import UseTaskOperations from "../../hooks/useTaskOperations";

function Calendar() {
  const { taskItems } = useContext(TaskContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const dayKey = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );
  const emptyCellsArray = Array.from({ length: firstDayOfWeek - 1 }, () => "");
  const remainingCells = 35 - (emptyCellsArray.length + daysArray.length);
  const remainingCellsArray = Array.from({ length: remainingCells }, () => "");
  const todaysDate = new Date();
  const calendarCells = [
    ...emptyCellsArray,
    ...daysArray,
    ...remainingCellsArray,
  ];
  const {
    createModal,
    taskToEdit,
    onClose,
    showCreateModal,
    handleEdit,
    handleCreate,
  } = UseTaskOperations();

  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        prevDate.getDate()
      );
    });
  };

  const nextMonth = () => {
    setCurrentDate((nextDate) => {
      return new Date(
        nextDate.getFullYear(),
        nextDate.getMonth() + 1,
        nextDate.getDate()
      );
    });
  };

  const addDayCell = () => {
    return dayKey.map((day, index) => <p key={`day-${index}`}>{day}</p>);
  };

  const taskCount = (datekey) => {
    if (!taskItems) {
      return;
    }
    let count = 0;
    const taskArray = [...taskItems];
    taskArray.forEach((task) => (task.dateDue === datekey ? count++ : null));
    return count > 0 ? count : null;
  };

  const createCells = () => {
    return calendarCells.map((day, index) => {
      const dateKey = day
        ? `${day < 10 ? `0${day}` : day}/${
            month + 1 < 10 ? `0${month + 1}` : month + 1
          }/${year}`
        : `empty/${index}/${month + 1}`;
      console.log(dateKey);
      return (
        <div key={dateKey} className="cell">
          <p
            className={
              month === todaysDate.getMonth() &&
              year === todaysDate.getFullYear() &&
              day === todaysDate.getDate()
                ? "today"
                : ""
            }
          >
            {day}
          </p>
          {addTasksInCells(dateKey)}
        </div>
      );
    });
  };

  const addTasksInCells = (dateKey) => {
    if (!taskItems) {
      return;
    }
    let count = 0;
    let filled = false;
    const taskCountInDate = taskCount(dateKey);
    const FilteredByPriority = taskItems
      .filter((task) => task.dateDue === dateKey)
      .sort((a, b) => b.priority - a.priority);

    return FilteredByPriority.map((task, index) => {
      if (count > 1 && taskCountInDate > 3 && !filled) {
        filled = true;
        return (
          <span key={index + dateKey} className="cellTask extra">
            {taskCountInDate - 2} more tasks
          </span>
        );
      }
      if (count < 3 && !filled) {
        count > 3 ? (filled = true) : (filled = false);
        count++;
        return (
          <span
            onClick={() => showCreateModal("view", task)}
            key={index + dateKey}
            className={`cellTask priority${task.priority}`}
          >
            {task.title}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <div className="calendar">
      {createModal ? (
        <TaskCreateForm
          mode={createModal}
          create={true}
          onClose={onClose}
          TaskSubmit={createModal === "view" ? handleEdit : handleCreate}
          handleEdit={handleEdit}
          task={createModal === "view" ? taskToEdit : null}
        />
      ) : null}
      <div className="topContainer">
        <button className="calendarButton" onClick={prevMonth}>
          &lt;
        </button>
        <p>
          {getMonthName(currentDate)} {year}
        </p>
        <button className="calendarButton" onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <div className="daysContainer">{addDayCell()}</div>
      <div className="cellContainer">{createCells()}</div>
    </div>
  );
}

export default Calendar;
