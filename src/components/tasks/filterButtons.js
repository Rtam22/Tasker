import "./filterButtons.css";

const FilterButtons = ({ filterTasks, filter }) => {
  const handleClick = (filter) => {
    console.log(filter);
    filterTasks(filter);
  };

  return (
    <>
      <h4>Filter</h4>
      <div className="left">
        <button
          className={
            filter === "highPriority" ? "filterButton active" : "filterButton"
          }
          onClick={() =>
            handleClick(filter === "highPriority" ? "default" : "highPriority")
          }
        >
          High Priority
        </button>
        <button
          className={
            filter === "dueSoon" ? "filterButton active" : "filterButton"
          }
          onClick={() =>
            handleClick(filter === "dueSoon" ? "default" : "dueSoon")
          }
        >
          Due Soon
        </button>
        <button
          className={
            filter === "unCompleted" ? "filterButton active" : "filterButton"
          }
          onClick={() =>
            handleClick(filter === "unCompleted" ? "default" : "unCompleted")
          }
        >
          Uncompleted
        </button>
        <button
          className={
            filter === "completed" ? "filterButton active" : "filterButton"
          }
          onClick={() =>
            handleClick(filter === "completed" ? "default" : "completed")
          }
        >
          Completed
        </button>
      </div>
    </>
  );
};

export default FilterButtons;
