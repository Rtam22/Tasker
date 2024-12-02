import {
  getDateDDMMYYYY,
  getDateDaysFromToday,
  getDateMonthsFromToday,
  setInitialDate,
  getDaysInMonth,
  getMonthName,
  convertDueDate,
  convertDueByHours,
  convertDueByDays,
  convertToYYYYMMDD,
} from "./dateUtils";

describe("Date util tests", () => {
  test("Should return the correct date X days from today", () => {
    const daysToAdd = 5;
    const currentDate = new Date();
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(currentDate.getDate() + daysToAdd);
    expect(getDateDaysFromToday(daysToAdd)).toEqual(expectedDate);
  });

  test("Should return the correct date X days from today", () => {
    const monthsToAdd = 2;
    const currentDate = new Date();
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(currentDate.getMonth() + monthsToAdd);
    expect(getDateMonthsFromToday(monthsToAdd)).toEqual(expectedDate);
  });

  test("Should return PASSED date in DDMMYYYY format", () => {
    const currentDate = new Date(2024, 9, 18);
    const expectedDate = "18/10/2024";
    expect(setInitialDate(currentDate)).toBe(expectedDate);
  });

  test("Should return CURRENT date in DDMMYYYY format", () => {
    const mockDate = new Date(2024, 9, 18);
    const spy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const expectedDate = "18/10/2024";
    expect(getDateDDMMYYYY()).toBe(expectedDate);

    spy.mockRestore();
  });

  test("Should return amount of days within a month", () => {
    const months = {
      january: 0,
      may: 4,
      september: 8,
    };
    const year = 2024;

    expect(getDaysInMonth(year, months.january)).toBe(31);
    expect(getDaysInMonth(year, months.may)).toBe(31);
    expect(getDaysInMonth(year, months.september)).toBe(30);
  });

  test("Should return month name given a month index number", () => {
    const mockDateOctober = new Date(2024, 9, 10);
    const mockDateFebruary = new Date(2024, 1, 10);
    const mockDateDecember = new Date(2024, 11, 10);

    expect(getMonthName(mockDateOctober)).toBe("October");
    expect(getMonthName(mockDateFebruary)).toBe("February");
    expect(getMonthName(mockDateDecember)).toBe("December");
  });

  test("Should return correct days for future date", () => {
    const currentDate = new Date();
    const dueDate = `${currentDate.getDate() + 5}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    expect(convertDueDate(dueDate)).toBe("4 days");
  });

  test("Should return correct hours for future date", () => {
    const currentDate = new Date();
    const futureDate = `${currentDate.getDate() + 1}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    const result = convertDueDate(futureDate);

    expect(result).toMatch(/\d+ hours/);
  });
});
