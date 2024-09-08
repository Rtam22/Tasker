import "./noteList.css";
import Note from "./note";
import { useContext, useEffect, useState } from "react";
import { BinContext } from "../../context/binContext";
import { v4 as uuidv4 } from "uuid";
import { getDateDDMMYYYY } from "../../utils/dateUtils";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function NoteList() {
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [noteContent, setNoteContent] = useLocalStorage("noteContent", []);
  const [noteDraft, setNoteDraft] = useState([...noteContent]);
  const { addNoteToBin, clearRestoredNotes, restoredNotes } =
    useContext(BinContext) ?? {};

  useEffect(() => {
    setNoteDraft(noteContent);
  }, [noteContent]);

  useEffect(() => {
    if (restoredNotes.length > 0) {
      setNoteDraft([...restoredNotes, ...noteContent]);
      setNoteContent([...restoredNotes, ...noteContent]);
      clearRestoredNotes();
    }
  }, [restoredNotes, clearRestoredNotes, noteContent]);

  const handleOnClose = () => {
    handleBlur(activeNoteIndex);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleOnClose);

    return () => {
      window.removeEventListener("beforeunload", handleOnClose);
    };
  }, []);

  const handleNoteClick = (index) => {
    console.log(index);
    setActiveNoteIndex(index);
  };

  const handleChange = (index, event) => {
    const newDraft = [...noteDraft];
    newDraft[index].content = event.target.value;
    setNoteDraft(newDraft);
  };

  const handleDelete = (index) => {
    const toDelete = noteContent[index];
    toDelete["date deleted"] = getDateDDMMYYYY();
    const deleteContent = noteContent.filter((_, i) => i !== index);
    setNoteContent(deleteContent);
    setNoteDraft(deleteContent);

    if (!isNoteEmpty(toDelete.content)) {
      addNoteToBin(toDelete);
    }
  };

  const isNoteEmpty = (string) => {
    return string.trim().length === 0;
  };

  const handleBlur = (index) => {
    setNoteContent((prev) => {
      const newContent = [...prev];
      newContent[index] = noteDraft[index];
      return newContent;
    });
  };

  const handleCreate = () => {
    console.log(noteContent);
    const newArray = [
      {
        id: uuidv4(),
        type: "note",
        content: "",
        "date created": getDateDDMMYYYY(),
        "date deleted": "",
        color: Math.floor(Math.random() * 4),
      },
      ...noteContent,
    ];
    setNoteContent(newArray);
    setNoteDraft(newArray);
  };

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
            content={noteDraft[index].content}
            edit={(event) => handleChange(index, event)}
            onClick={() => handleDelete(index)}
            onBlur={() => handleBlur(index)}
            color={content.color ? content.color : ""}
            onNoteClick={handleNoteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
