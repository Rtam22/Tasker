import React, { useContext } from "react";
import TopOptionBar from "../components/navigation/topOptionBar";
import ReminderList from "../components/reminders/reminderList";
import "./reminders.css";
import { NotificationContext } from "../context/notificationContext";

function Reminders() {
  const { notifications } = useContext(NotificationContext);
  return (
    <div className="content-container">
      <TopOptionBar name="Notes" />
      <ReminderList notifications={notifications} />
    </div>
  );
}

export default Reminders;
