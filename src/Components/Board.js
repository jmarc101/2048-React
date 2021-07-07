import React from "react";
import Square from "./Tile";




class Board extends React.Component {

  




render() {
  const { numberOfRows, boardValues, gameOver, gameWon } = this.props;

  const widthAndHeight =
    numberOfRows * (numberOfRows > 10 ? 50 : 100) + 10;


  const type = gameOver || gameWon ? "container board frozen" : "container board";

  return (
    <div className="wholeWindow" >
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
          style={{
            opacity: gameOver || gameWon ? 0.5 : 0,
            transitionDuration:
              gameOver || gameWon ? "3000ms" : "0ms",
          }}
        >
          <p className="message-p">
            {gameOver ? "Game over" : "Félicitation vous avez réussi"}
          </p>
        </div>
      </div>
    </div>
  );
}

}

export default Board;
