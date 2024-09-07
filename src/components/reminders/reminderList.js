import ReminderCard from "./reminderCard";
import "./reminderList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const ReminderList = ({ notifications }) => {
  const convertPriority = (priority) => {
    switch (priority) {
      case "1": {
        return "Low";
      }
      case "2": {
        return "Medium";
      }
      case "3": {
        return "High";
      }
      case "4": {
        return "Important";
      }
      default: {
        return;
      }
    }
  };

  return (
    <div className="reminderList">
      <div className="content">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return (
              <ReminderCard
                key={notification.key}
                title={notification.title}
                priority={convertPriority(notification.priority)}
                postedTime={notification.postedTime}
                type={notification.type}
                dueIn={notification.dueIn}
                notificationKey={notification.key}
              />
            );
          })
        ) : (
          <div className="empty-container">
            <FontAwesomeIcon className="emptyIcon" icon={faBell} />
            <p>No Reminders to Display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderList;
