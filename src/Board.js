import React from "react";
import Square from "./Square";

const Board = (props) => {
  const boardValues = props.boardValues;

  //   return <div className="board">{tileValues.forEach((element) => {

  //   })}</div>;
  return (
    <>
      <div className="board">
        <div className="board-row">
          <Square value={boardValues[0]} />
          <Square value={boardValues[1]} />
          <Square value={boardValues[2]} />
          <Square value={boardValues[3]} />
        </div>
        <div className="board-row">
          <Square value={boardValues[4]} />
          <Square value={boardValues[5]} />
          <Square value={boardValues[6]} />
          <Square value={boardValues[7]} />
        </div>
        <div className="board-row">
          <Square value={boardValues[8]} />
          <Square value={boardValues[9]} />
          <Square value={boardValues[10]} />
          <Square value={boardValues[11]} />
        </div>
        <div className="board-row">
          <Square value={boardValues[12]} />
          <Square value={boardValues[13]} />
          <Square value={boardValues[14]} />
          <Square value={boardValues[15]} />
        </div>
      </div>
    </>
  );
};

export default Board;
