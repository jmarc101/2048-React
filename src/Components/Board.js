import React from "react";
import Square from "./Tile";

const Board = (props) => {
  const boardValues = props.boardValues;
  const widthAndHeight = Math.sqrt(props.rowLength * props.rowLength) * (props.rowLength > 10 ? 50 : 100) + 10;

  //   return <div className="board">{tileValues.forEach((element) => {

  //   })}</div>;
  return (
    <>
      <div
        className="container board"
        style={{ width: widthAndHeight, height: widthAndHeight }}
      >
        <div className="row">
          {boardValues.map((tile, index) => {
            return <Square key={index} value={tile} rowLength={props.rowLength}  />;
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
