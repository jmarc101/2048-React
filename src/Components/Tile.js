import { BackgroundColor } from "chalk";
import React from "react";
import colors from "../Ressources/colors";

const Tile = (props) => {
  // if value == 0, we should empty String else the number
  const value = props.value;
  const parseValue = (value) => {
    return value === 0 ? "" : "" + value;
  };
  const smallSquares = props.rowLength > 10

  //
  return (
    <div
      className="tile"
      style={{
        backgroundColor: colors[Math.log2(value)],
        color: value >= 8 ? "white" : "darkGreen",
        fontSize: smallSquares ? "1rem" : "1.8rem",
        width: smallSquares ? "50px" : "100px",
        height: smallSquares ? "50px" : "100px",
        
      }}
    >
      <p 
      className="content"
      style={{
        marginTop: smallSquares ? "10px" : "22px",
        marginLeft: smallSquares && value > 1000 ? "-9.5px" : "0"
      }}
      >{parseValue(value)}</p>
    </div>
  );
};

export default Tile;
