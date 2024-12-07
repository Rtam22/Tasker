import { useState } from "react";
import "./dateSelection.css";

const DateSelection = ({ setCurrentDate, currentDate }) => {
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const monthForward = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate());
    });
  };

  const monthBackward = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate());
    });
  };

  const yearForward = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear() + 1, prev.getMonth(), prev.getDate());
    });
  };

  const yearBackward = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear() - 1, prev.getMonth(), prev.getDate());
    });
  };

  return (
    <div className="dateSelection">
      <div>
        <button onClick={yearBackward}>‹‹</button>
        <button onClick={monthBackward}>‹</button>
      </div>

      <h2>{`${month} ${year}`}</h2>
      <div>
        <button onClick={monthForward}>›</button>
        <button onClick={yearForward}>››</button>
      </div>
    </div>
  );
};

export default DateSelection;
