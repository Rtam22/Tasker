import "./archiveItem.css";

const ArchiveItem = ({
  title,
  status,
  dueDate,
  handleSelect,
  index,
  value,
}) => {
  return (
    <div className="archiveItem">
      <input
        checked={value === 0 ? true : false || value ? true : false}
        type="checkbox"
        onChange={() => handleSelect(index)}
      ></input>
      <p>{title}</p>
      <p>{status}</p>
      <p>{dueDate}</p>
    </div>
  );
};

export default ArchiveItem;
