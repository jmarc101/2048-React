import React from "react";
import "../App.css";
import Square from "./Tile";

const Board = (props) => {
  const { numberOfRows, boardValues } = props;
  const { state } = props.reducer;

  const widthAndHeight =
    Math.sqrt(numberOfRows * numberOfRows) * (numberOfRows > 10 ? 50 : 100) +
    10;


  const type = state.gameOver || state.gameWon ? "container board frozen" : "container board";

  const displayMessage = (message) => (
    <div className="message">
      {message}
    </div>
  );


  return (
    <>
    <div className="holder" style={{ width: widthAndHeight, height: widthAndHeight}}>
      <div className={type}>
        <div className="row">
          {boardValues.map((tile, index) => {
            return <Square key={index} value={tile} rowLength={numberOfRows} />;
          })}
        </div>

      </div>
      {state.gameOver ? displayMessage("Game Over !") : <></>}
      {state.gameWon ? displayMessage("You Win !") : <></>}
    </div>


    </>
  );
};

export default Board;
