import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Notes from "./pages/notes";
import Reminders from "./pages/reminders";
import Archive from "./pages/archive";
import Bin from "./pages/bin";
import AllTasks from "./pages/tasks/allTasks";
import CalendarTasks from "./pages/tasks/calendarTasks";
import TodayTasks from "./pages/tasks/todayTasks";
import WeekTasks from "./pages/tasks/weekTasks";
import SearchPage from "./pages/searchPage";

export const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "notes", element: <Notes /> },
      { path: "reminders", element: <Reminders /> },
      { path: "archive", element: <Archive /> },
      { path: "bin", element: <Bin /> },
      { path: "today", element: <TodayTasks /> },
      { path: "week", element: <WeekTasks /> },
      { path: "tasks", element: <AllTasks /> },
      { path: "calendar", element: <CalendarTasks /> },
      { path: "search", element: <SearchPage /> },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);
