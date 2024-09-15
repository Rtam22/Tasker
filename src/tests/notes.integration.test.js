import {
  fireEvent,
  screen,
  cleanup,
  within,
  waitFor,
} from "@testing-library/react";
import { renderWithRouter, navigateToBin } from "./testUtils.js";

describe("Note Section Intergration Tests", () => {
  beforeEach(() => {
    renderWithRouter();
  });

  afterEach(() => {
    cleanup();
  });

  const userTasks = [
    "Buy a cake",
    "Read a book",
    "Attend meeting",
    "Buy groceries",
  ];

  test("Notes are created with create button", () => {
    //Create a single note
    fireEvent.click(screen.getByText("Create Note"));
    const newNote = screen.getAllByPlaceholderText("Enter note content…");
    expect(newNote.length).toBeInTheDocument;

    //Create multiple notes (5)
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText("Create Note"));
    }
    const notes = screen.getAllByPlaceholderText("Enter note content…");
    expect(notes.length).toEqual(6);
  });

  test("Notes are edited with a value and saved with onBlur", () => {
    //Edit notes and onblur save
    const noteList = screen.getAllByPlaceholderText("Enter note content…");
    userTasks.forEach((task, index) => {
      fireEvent.change(noteList[index], { target: { value: task } });
      fireEvent.blur(noteList[index]);
      expect(noteList[index].value).toBe(task);
    });

    //Simulate a refresh to check note saves
    renderWithRouter().refreshPage();

    waitFor(() => {
      userTasks.forEach((task, index) => {
        expect(noteList[index].value).toBe(task);
      });
    });
  });

  test("Notes are deleted and placed in bin", () => {
    //Find all notes and delete them
    const noteDeleteButtons = screen.getAllByText("x");
    expect(noteDeleteButtons.length).toBe(6);

    for (let i = 0; i < 6; i++) {
      fireEvent.click(noteDeleteButtons[0]);
    }
    expect(screen.queryByPlaceholderText("Enter note content…")).toBeNull();

    const binContainer = navigateToBin();

    userTasks.forEach((task) => {
      expect(within(binContainer).queryByText(task)).toBeInTheDocument;
    });
  });

  test("Notes are deleted from bin", () => {
    const binContainer = navigateToBin();

    //Check tasks are in bin
    userTasks.forEach((task) => {
      expect(within(binContainer).queryByText(task)).toBeInTheDocument;
    });

    //Check first two note items and delete from bin
    expect(within(binContainer).getAllByRole("checkbox").length).toBe(4);
    const noteCheckBoxes = within(binContainer).getAllByRole("checkbox");
    for (let i = 0; i < 2; i++) {
      fireEvent.click(noteCheckBoxes[i]);
      expect(noteCheckBoxes[i]).toBeChecked();
    }

    fireEvent.click(screen.getByText("Delete"));
    waitFor(() => {
      expect(screen.queryByText("Attend meeting")).toBeNull();
      expect(screen.queryByText("Buy groceries")).toBeNull();
      expect(within(binContainer).getAllByRole("checkbox").length).toBe(2);
    });
  });

  test("Notes are restored from bin", () => {
    const binContainer = navigateToBin();

    //Restore remaining notes
    const remainingCheckBox = within(binContainer).getAllByRole("checkbox");
    for (let i = 0; i < remainingCheckBox.length; i++) {
      fireEvent.click(remainingCheckBox[i]);
      expect(remainingCheckBox[i]).toBeChecked;
    }

    fireEvent.click(screen.getByText("Restore"));
    waitFor(() => {
      expect(screen.queryByText("Buy a cake")).toBeNull();
      expect(screen.queryByText("Read a book")).toBeNull();
    });

    //Navigate to Notes and check the right notes are restored
    fireEvent.click(screen.getAllByText("Notes")[0]);
    waitFor(() => {
      expect(screen.getByText("Buy a cake")).toBeInTheDocument;
      expect(screen.getByText("Read a book")).toBeInTheDocument;
      expect(screen.queryByText("Attend meeting")).toBeNull();
      expect(screen.queryByText("Buy groceries")).toBeNull();
    });
  });
});
