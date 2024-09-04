import "./mobileTask.css";

const MobileTask = (props) => {
  const handleClick = (event) => {
    if (!event.target.matches('input[type="checkbox"]')) {
      props.onEdit("view", props.task);
    }
  };
  return (
    <div className={`mobile-task-item ${props.class ? props.class : ""}`}>
      <div className="top-bar">
        <input
          type="checkbox"
          onChange={props.onChange}
          checked={props.checked}
        ></input>
      </div>
      <div className="item-content" onClick={handleClick}>
        <div className="flex">
          <p className="attribute">Title: </p>
          <p>{props.title}</p>
        </div>

        <div className="flex">
          <p className="attribute">Due In: </p>
          <p
            className={
              props.dateDue === "OverDue" && props.status !== "Completed"
                ? "overDue"
                : null
            }
          >
            {props.dateDue}
          </p>
        </div>

        <div className="flex">
          <p className="attribute">Status: </p>
          <p className={props.status === "Completed" ? "completed" : null}>
            {props.status}
          </p>
        </div>

        <div className="flex">
          <p className="attribute">Priority: </p>
          <p className={`prio${props.priorityColor}`}>{props.priority}</p>
        </div>
      </div>
    </div>
  );
};
export default MobileTask;
