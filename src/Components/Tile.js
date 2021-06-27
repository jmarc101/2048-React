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
    <div className="tile" style={{ backgroundColor: colors[Math.log2(value)] }}>
      <p className="content">{parseValue(value)}</p>
    </div>
  );
};

export default Tile;
