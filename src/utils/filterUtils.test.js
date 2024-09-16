import {
  filterByPriority,
  filteredByDueSoon,
  filterByUnCompleted,
  filterByCompleted,
  filterTasksByWeek,
  filterTasksByToday,
} from "./filterUtils";
import { setInitialDate, getDateDaysFromToday } from "./dateUtils";

describe("Filter utils tests", () => {
  const tasks = [
    {
      title: "Clean the house",
      priority: "2",
      dateDue: "13/11/2024",
      status: "Completed",
    },
    {
      title: "Plan a meeting",
      priority: "3",
      dateDue: "10/12/2024",
      status: "To Do",
    },
    {
      title: "Submit report",
      priority: "4",
      dateDue: "05/10/2024",
      status: "Pending",
    },
    {
      title: "Buy a cake",
      priority: "1",
      dateDue: "02/10/2024",
      status: "Completed",
    },
  ];

  test("Tasks should filter by priority", () => {
    expect(filterByPriority(tasks)).toEqual([
      tasks[2],
      tasks[1],
      tasks[0],
      tasks[3],
    ]);
  });

  test("Tasks should filter by due soon", () => {
    expect(filteredByDueSoon(tasks)).toEqual([
      tasks[3],
      tasks[2],
      tasks[0],
      tasks[1],
    ]);
  });

  test("Tasks should filter by uncompleted or completed", () => {
    expect(filterByUnCompleted(tasks)).toEqual([tasks[1], tasks[2]]);
    expect(filterByCompleted(tasks)).toEqual([tasks[0], tasks[3]]);
  });

  test("Tasks should filter by day or week", () => {
    const tasks = [
      {
        title: "Clean the house",
        dateDue: setInitialDate(getDateDaysFromToday(1)),
      },
      {
        title: "Submit report",
        dateDue: setInitialDate(getDateDaysFromToday(8)),
      },
      {
        title: "Plan a meeting",
        dateDue: setInitialDate(getDateDaysFromToday(1)),
      },
      { title: "Buy a cake", dateDue: setInitialDate(getDateDaysFromToday(4)) },
    ];
    expect(filterTasksByToday(tasks)).toEqual([tasks[0], tasks[2]]);
    expect(filterTasksByWeek(tasks)).toEqual([tasks[0], tasks[2], tasks[3]]);
  });
});
