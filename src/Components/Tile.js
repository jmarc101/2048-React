import { BackgroundColor } from "chalk";
import React from "react";
import colors from "../Ressources/colors";

const Tile = (props) => {
  // if value == 0, we should empty String else the number
  const value = props.value;

  const parseValue = (value) => {
    return value === 0 ? "" : "" + value;
  };

  //
  return (
    <div
      className="tile"
      style={{
        backgroundColor: colors[Math.log2(value)],
        color: value >= 8 ? "white" : "darkGreen",
        fontSize: value > 1000 ? "1.8rem" : "2rem",
      }}
    >
      <p className="content">{parseValue(value)}</p>
    </div>
  );
};

export default Tile;
