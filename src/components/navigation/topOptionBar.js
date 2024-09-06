import "./topOptionBar.css";
import Search from "../search";
import MobileNavigation from "./mobileNavigation";

import SearchModal from "./searchModal";
function TopOptionBar(props) {
  return (
    <div className="topOptionBar">
      <div className="topOptionBarContainer">
        <button className="button task">New Task</button>
        <MobileNavigation />
        <h2>{props.name}</h2>

        <SearchModal />
        <div className="desktopSearch">
          <Search />
        </div>
      </div>
      <hr className="topBarHr"></hr>
    </div>
  );
}

export default TopOptionBar;
