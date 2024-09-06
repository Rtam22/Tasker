import "./topOptionBar.css";
import Search from "../search";
import MobileNavigation from "./mobileNavigation";
import UseTaskOperations from "../../hooks/useTaskOperations";
import TaskCreateForm from "../tasks/taskForm";
import SearchModal from "./searchModal";

function TopOptionBar(props) {
  const { showCreateModal, createModal, onClose, handleCreate } =
    UseTaskOperations();
  return (
    <div className="topOptionBar">
      <div className="topOptionBarContainer">
        <button
          className="button task"
          onClick={() => showCreateModal("create", null)}
        >
          New Task
        </button>
        <MobileNavigation />
        <h2>{props.name}</h2>

        <SearchModal />
        <div className="desktopSearch">
          <Search />
        </div>
      </div>
      <hr className="topBarHr"></hr>
      {createModal && (
        <TaskCreateForm
          mode={createModal}
          create={true}
          onClose={onClose}
          TaskSubmit={handleCreate}
          task={null}
        />
      )}
    </div>
  );
}

export default TopOptionBar;
