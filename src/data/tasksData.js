import { v4 as uuidv4 } from "uuid";
import {
  setInitialDate,
  getDateDaysFromToday,
  getDateDDMMYYYY,
} from "../utils/dateUtils";

export const initialTasks = [
  {
    key: uuidv4(),
    title: "Complete Project Report",
    description:
      "Finish the final report for the project and submit it to the manager.",
    dateDue: setInitialDate(getDateDaysFromToday(5)),
    dateCreated: getDateDDMMYYYY(),
    dateDeleted: "",
    isDeleted: false,
    isArchived: false,
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
    isDeleted: false,
    isArchived: false,
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
    isDeleted: false,
    isArchived: false,
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
    isDeleted: false,
    isArchived: false,
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
    isDeleted: false,
    isArchived: false,
    status: "Pending",
    priority: "1",
    notified: { dueSoon: false, overDue: false },
  },
];
