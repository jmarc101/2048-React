import React from "react";
import "../App.css";
import Square from "./Tile";

const Board = (props) => {
  const { numberOfRows, boardValues } = props;
  const widthAndHeight =
    Math.sqrt(numberOfRows * numberOfRows) * (numberOfRows > 10 ? 50 : 100) +
    10;

  return (
    <>
      <div
        className="container board"
        style={{ width: widthAndHeight, height: widthAndHeight }}
      >
        <div className="row">
          {boardValues.map((tile, index) => {
            return <Square key={index} value={tile} rowLength={numberOfRows} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
