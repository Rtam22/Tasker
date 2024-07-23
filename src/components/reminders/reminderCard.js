import "./reminderCard.css";
import { NotificationContext } from "../../context/notificationContext";
import { useContext } from "react";
const ReminderCard = (props) => {
  const { removeNotification } = useContext(NotificationContext);

  const handleDelete = (notificationKey) => {
    removeNotification(notificationKey);
  };

  return (
    <div className="reminderCard">
      <div className="cardTitle">
        <h4>Task Notification</h4>
        <button onClick={() => handleDelete(props.notificationKey)}>x</button>
      </div>
      <div className="cardBody">
        <p>
          Your Task <span className="bold">"{props.title}" </span>is{" "}
          {props.type === "overDue" ? (
            <span className=" highlight">OVERDUE!</span>
          ) : (
            <>
              due in <span className="highlight">{props.dueIn} Hours!</span>
            </>
          )}
        </p>
      </div>
      <div className="cardFooter">
        <span>
          <p>Priority:</p>
          <p className={props.priority === "Important" ? "highlight" : null}>
            {props.priority}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ReminderCard;
