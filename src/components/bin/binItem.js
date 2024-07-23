import "./binItem.css";

function BinItem(props) {
  return (
    <div className={`binItem ${props.class ? props.class : ""}`}>
      <input
        type="checkbox"
        onChange={props.handleChange}
        checked={props.checked}
      ></input>
      <p>{props.name}</p>
      <p>{props.col1}</p>
      <p>{props.col2}</p>
    </div>
  );
}

export default BinItem;
