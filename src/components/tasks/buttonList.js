const ButtonList = ({ showCreateModal, handleDelete, taskItems }) => {
  return (
    <div className="right">
      <button
        className="buttonSimple"
        onClick={() => showCreateModal("create", null)}
      >
        Create
      </button>
      <span className="separator">|</span>
      <button className="buttonSimple" onClick={() => handleDelete(taskItems)}>
        Delete
      </button>
    </div>
  );
};

export default ButtonList;
