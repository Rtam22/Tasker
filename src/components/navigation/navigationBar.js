import "./navigationBar.css";
import Logo from "./logo";
import NavigationButton from "./navigationButton";
import TasksasknavigationButton from "./tasknavigationButton";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faNoteSticky,
  faBoxArchive,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../../context/taskContext";
import { useContext } from "react";
import { NotificationContext } from "../../context/notificationContext";

function NavigationBar() {
  const { weekCount, todayCount, taskItems } = useContext(TaskContext);
  const { notifications } = useContext(NotificationContext);
  return (
    <div className="navigationBar">
      <div className="desktopNavigation">
        <Logo />

        <hr></hr>
        <NavLink to="/notes">
          <NavigationButton
            icon={<FontAwesomeIcon className="nav-icon" icon={faNoteSticky} />}
            title="Notes"
          />
        </NavLink>

        <NavLink to="/reminders">
          <NavigationButton
            icon={<FontAwesomeIcon className="nav-icon" icon={faBell} />}
            title="Reminders"
            notification={
              notifications.length > 0 ? notifications.length : null
            }
            reminder={notifications.length > 0 ? true : false}
          />
        </NavLink>

        <p className="taskTitle">Tasks</p>
        <hr></hr>

        <NavLink to="/today">
          <TasksasknavigationButton
            title="Today"
            notification={todayCount ? todayCount : null}
          />
        </NavLink>

        <NavLink to="/week">
          <TasksasknavigationButton
            title="Week"
            notification={weekCount ? weekCount : null}
          />
        </NavLink>

        <NavLink to="/tasks">
          <TasksasknavigationButton
            title="All Tasks"
            notification={taskItems ? taskItems.length : null}
          />
        </NavLink>

        <NavLink to="/calendar">
          <TasksasknavigationButton title="Calendar" />
        </NavLink>

        <hr></hr>
        <NavLink to="/archive">
          <NavigationButton
            icon={<FontAwesomeIcon className="nav-icon" icon={faBoxArchive} />}
            title="Archive"
          />
        </NavLink>

        <NavLink to="/bin">
          <NavigationButton
            icon={<FontAwesomeIcon className="nav-icon" icon={faTrashCan} />}
            title="Bin"
          />
        </NavLink>

        <div className="tasks"></div>
      </div>

      <div className="mobileNavigation"></div>
    </div>
  );
}

export default NavigationBar;
