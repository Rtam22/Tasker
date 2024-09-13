import "./notes.css";
import TopOptionBar from "../components/navigation/topOptionBar";
import NoteList from "../components/notes/noteList";
import UseNotesOperations from "../hooks/useNotesOperations";

function Notes() {
  const {
    noteContent,
    noteDraft,
    handleBlur,
    handleCreate,
    handleDelete,
    handleChange,
    handleNoteClick,
  } = UseNotesOperations();

  return (
    <div className="content-container">
      <TopOptionBar name="Notes" />
      <NoteList
        noteContent={noteContent}
        noteDraft={noteDraft}
        handleCreate={handleCreate}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleBlur={handleBlur}
        handleNoteClick={handleNoteClick}
      />
    </div>
  );
}

export default Notes;
