import "./tasks.css";

const Tasks = (props) => {
  const handleClick = (event) => {
    if (!event.target.matches('input[type="checkbox"]')) {
      props.onEdit("edit", props.task);
    }
  };
  return (
    <div
      onClick={props.class === "description" ? null : handleClick}
      className={`taskItem ${props.class ? props.class : ""}`}
    >
      <input
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
      ></input>
      <p>{props.title}</p>
      <p
        className={
          props.dateDue === "OverDue" && props.status !== "Completed"
            ? "overDue"
            : null
        }
      >
        {props.dateDue}
      </p>
      <p className={props.status === "Completed" ? "completed" : null}>
        {props.status}
      </p>
      <p className={`prio${props.priorityColor}`}>{props.priority}</p>
      {!props.class ? <button>:</button> : null}
    </div>
  );
};
export default Tasks;
