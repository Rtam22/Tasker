import "./noteList.css";
import Note from "./note";
function NoteList({
  noteDraft,
  noteContent,
  handleCreate,
  handleChange,
  handleDelete,
  handleBlur,
  handleNoteClick,
}) {
  return (
    <div className="noteList">
      <div className="buttonContainer">
        <button className="createButton" onClick={handleCreate}>
          Create Note
        </button>
      </div>
      <div className="content">
        {noteContent.map((content, index) => (
          <Note
            key={index}
            index={index}
            noteContent={noteDraft[index].content}
            handleChange={(event) => handleChange(index, event)}
            handleDelete={() => handleDelete(index)}
            handleBlur={() => handleBlur(index)}
            color={content.color ? content.color : ""}
            handleNoteClick={handleNoteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
