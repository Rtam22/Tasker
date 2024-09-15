import "./note.css";

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

function Note({
  noteContent,
  color,
  index,
  handleDelete,
  handleChange,
  handleBlur,
  handleNoteClick,
}) {
  return (
    <div
      className={`note ${noteColorSelect(color).color}`}
      onClick={() => handleNoteClick(index)}
    >
      <div className={`note-options ${noteColorSelect(color).colorTop}`}>
        <button onClick={handleDelete}>x</button>
      </div>
      <div className="note-content">
        <textarea
          placeholder="Enter note content…"
          value={noteContent}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
