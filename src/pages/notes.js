import "./notes.css";
import TopOptionBar from "../components/navigation/topOptionBar";
import NoteList from "../components/notes/noteList";

function Notes() {
  return (
    <div className="content-container">
      <TopOptionBar name="Notes" />
      <NoteList />
    </div>
  );
}

export default Notes;
