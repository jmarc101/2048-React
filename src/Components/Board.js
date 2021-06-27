import React from "react";
import Square from "./Square";

const Board = (props) => {
  const boardValues = props.boardValues;

  //   return <div className="board">{tileValues.forEach((element) => {

  //   })}</div>;
  return (
    <>
      <div className="container board">
        <div className="row row-cols-4">
          {boardValues.map((tile, index) => {
            return <Square key={index} value={tile} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
