import "./topOptionBar.css";

function TopOptionBar(props) {
  return (
    <div className="topOptionBar">
      <div className="topOptionBarContainer">
        <button>New Task</button>
        <h2>{props.name}</h2>
        <img src="https://placehold.co/30x30" alt="placeholder"></img>
      </div>
      <hr></hr>
    </div>
  );
}

export default TopOptionBar;
