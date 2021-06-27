import React from "react";

const Square = (props) => {
  // if value == 0, we should empty String else the number
  const value = props.value;

  const parseValue = (value) => {
    return value == 0 ? "" : "" + value;
  };

  //
  return <button className="square">{parseValue(value)}</button>;
};

export default Square;
