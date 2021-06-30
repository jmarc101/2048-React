import React from "react";
import colors from "../Ressources/colors";

const Tile = ({value, rowLength}) => {
  const smallSquares = rowLength > 10

  //
  return (
    <div
      className={smallSquares ? "tile-small" : "tile"}
      style={{
        backgroundColor: colors[Math.log2(value)],
        color: value >= 8 ? "white" : "darkGreen"        
      }}>
      <p 
        className={smallSquares ? "content-small" : "content"}
        style={{
          marginLeft: smallSquares && value > 1000 ? "-9px" : '0'}}
          // TEXT NUMBER
        > {value === 0 ? "" : "" + value}
        </p>
    </div>
  );
};

export default Tile;
