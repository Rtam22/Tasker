import Calendar from "../../components/tasks/calendar";
import TopOptionBar from "../../components/navigation/topOptionBar";

function CalendarTasks() {
  return (
    <div className="content-container">
      <TopOptionBar name="Tasks" />
      <Calendar />
    </div>
  );
}

export default CalendarTasks;
