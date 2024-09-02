import "./navigationButton.css";

function NavigationButton(props) {
  return (
    <div className={"navigationButton " + props.active}>
      {props.icon}
      <p>{props.title}</p>
      <p className={`notificationNumber ${props.reminder ? "reminder" : ""}`}>
        {props.notification}
      </p>
    </div>
  );
}

export default NavigationButton;
