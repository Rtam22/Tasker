import TopOptionBar from "../components/navigation/topOptionBar";
import BinList from "../components/bin/binList";

function Bin() {
  return (
    <div className="content-container">
      <TopOptionBar name="Bin" />
      <BinList />
    </div>
  );
}

export default Bin;
