import "./note.css";

function Note(props) {
  const colors = [
    {},
    {
      color: "yellow",
      colorTop: "yellowTop",
    },
    {
      color: "orange",
      colorTop: "orangeTop",
    },
    {
      color: "green",
      colorTop: "greenTop",
    },
    {
      color: "blue",
      colorTop: "blueTop",
    },
  ];
  return (
    <div className={`note ${colors[props.color].color}`}>
      <div className={`note-options ${colors[props.color].colorTop}`}>
        <button onClick={props.onClick}>x</button>
      </div>
      <div className="note-content">
        <textarea
          value={props.content}
          onChange={props.edit}
          onBlur={props.onBlur}
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
