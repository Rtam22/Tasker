import "./note.css";

function Note(props) {
  const noteColorSelect = (number) => {
    switch (number) {
      case 0:
        return {
          color: "yellow",
          colorTop: "yellowTop",
        };
      case 1:
        return {
          color: "orange",
          colorTop: "orangeTop",
        };
      case 2:
        return {
          color: "green",
          colorTop: "greenTop",
        };
      case 3:
        return {
          color: "blue",
          colorTop: "blueTop",
        };
      default:
        return {
          color: "yellow",
          colorTop: "yellowTop",
        };
    }
  };

  return (
    <div className={`note ${noteColorSelect(props.color).color}`}>
      <div className={`note-options ${noteColorSelect(props.color).colorTop}`}>
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
