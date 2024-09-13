import { useContext, useEffect, useState } from "react";
import { BinContext } from "../context/binContext";
import { v4 as uuidv4 } from "uuid";
import { getDateDDMMYYYY } from "../utils/dateUtils";
import { useLocalStorage } from "./useLocalStorage";

function UseNotesOperations() {
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

  useEffect(() => {
    window.addEventListener("beforeunload", handleOnWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleOnWindowClose);
    };
  }, []);

  const handleNoteClick = (index) => {
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

  const handleOnWindowClose = () => {
    handleBlur(activeNoteIndex);
  };

  return {
    noteContent,
    noteDraft,
    handleBlur,
    handleCreate,
    handleDelete,
    handleChange,
    handleNoteClick,
  };
}

export default UseNotesOperations;
