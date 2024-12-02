import "./archiveItem.css";

const ArchiveItem = ({ title, status, dueDate }) => {
  return (
    <div className="archiveItem">
      <p>{title}</p>
      <p>{status}</p>
      <p>{dueDate}</p>
    </div>
  );
};

export default ArchiveItem;
