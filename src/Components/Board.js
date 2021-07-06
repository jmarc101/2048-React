import React from "react";
import "../App.css";
import Square from "./Tile";

const Board = (props) => {
  const { numberOfRows, boardValues } = props;
  const { state } = props.reducer;

  const widthAndHeight =
    numberOfRows * (numberOfRows > 10 ? 50 : 100) + 10;


  const type = state.gameOver || state.gameWon ? "container board frozen" : "container board";

  const displayMessage = (message) => (
    <div className="message">
      {message}
    </div>
  );


  return (
    <>
      <div
        className="holder"
        style={{ width: widthAndHeight, height: widthAndHeight }}
      >
        <div className={type}>
          <div className="row">
            {boardValues.map((tile, index) => {
              return (
                <Square key={index} value={tile} rowLength={numberOfRows} />
              );
            })}
          </div>
        </div>

        
        <div
          className="message-box"
          style={{ opacity: state.gameOver || state.gameOver ? 0.5 : 0 }}
        >
          <p 
          className="message-p">
            {state.gameOver
              ? "Game over"
              : "Félicitation vous avez réussi"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Board;
