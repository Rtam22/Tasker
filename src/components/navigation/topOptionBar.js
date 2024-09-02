import "./topOptionBar.css";
import Search from "../search";
function TopOptionBar(props) {
  return (
    <div className="topOptionBar">
      <div className="topOptionBarContainer">
        <button className="button">New Task</button>
        <h2>{props.name}</h2>
        <Search />
      </div>
      <hr></hr>
    </div>
  );
}

export default TopOptionBar;
