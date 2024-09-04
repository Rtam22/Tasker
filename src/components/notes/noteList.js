import "./noteList.css";
import Note from "./note";
import { useContext, useEffect, useState } from "react";
import { BinContext } from "../../context/binContext";
import { v4 as uuidv4 } from "uuid";
import { getDateDDMMYYYY } from "../../utils/dateUtils";
import {
  LoadUpLocalStorage,
  saveToLocalStorage,
} from "../../utils/StorageUtils";

function NoteList() {
  const [noteContent, setNoteContent] = useState([]);
  const [noteDraft, setNoteDraft] = useState([]);
  const { addNoteToBin, clearRestoredNotes, restoredNotes } =
    useContext(BinContext) ?? {};
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState();
  useEffect(() => {
    const savedNoteContent = LoadUpLocalStorage("noteContent");
    if (savedNoteContent) {
      setNoteContent(savedNoteContent);
      setNoteDraft(savedNoteContent);
    } else {
      setNoteContent([
        {
          id: uuidv4(),
          type: "note",
          content: "",
          "date created": getDateDDMMYYYY(),
          "date deleted": "",
          color: Math.floor(Math.random() * 4),
        },
      ]);
      setNoteDraft([""]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage("noteContent", noteContent);
    }
  }, [noteContent, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (restoredNotes.length > 0) {
        setNoteDraft([...restoredNotes, ...noteContent]);
        setNoteContent([...restoredNotes, ...noteContent]);
        clearRestoredNotes();
      }
    }
  }, [restoredNotes, isLoaded, clearRestoredNotes, noteContent]);

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
    addNoteToBin(toDelete);
  };

  const handleBlur = (index) => {
    const newContent = [...noteContent];
    newContent[index] = noteDraft[index];
    setNoteContent(newContent);
  };

  const handleCreate = () => {
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
    console.log(newArray);
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
            content={noteDraft[index].content}
            edit={(event) => handleChange(index, event)}
            onClick={() => handleDelete(index)}
            onBlur={() => handleBlur(index)}
            color={content.color ? content.color : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
