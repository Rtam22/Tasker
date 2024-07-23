import "./tasknavigationButton.css";

function TasknavigationButton(props) {
  return (
    <div className="tasknavigationButton">
      <p>{props.title}</p>
      <p className="notificationNumber">{props.notification}</p>
    </div>
  );
}

export default TasknavigationButton;
