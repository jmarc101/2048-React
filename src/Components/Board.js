import React from "react";
import Square from "./Tile";
import { getRandomIndexFromEmptySquares, randomTwoOrFourTile,
  removeEmptyTiles, hasTile, hasNoEmptyTile } from "../Ressources/utilities.js";

const maxTile = 2048;

class Board extends React.Component {

  handleKeyPressed = e => {

    const { isFirstGame, boardValues, updateBoard, increaseMovesCount,
    signalGameOver, signalGameWon, gameOver, gameWon } = this.props;

    if (gameOver || gameWon || isFirstGame) return;

    const initialBoard = [...boardValues];
    let newBoard;

    switch (e.key) {
      case "ArrowLeft": 
        newBoard = this.playedLeft(boardValues);
        break;
      case "ArrowUp": 
        newBoard = this.playedUp(boardValues);
        break
      case "ArrowRight": 
        newBoard = this.playedRight(boardValues);
        break;
      case "ArrowDown": 
        newBoard = this.playedDown(boardValues);
        break;
      default:
        return;
    }

    const boardUnchanged = JSON.stringify(initialBoard) === JSON.stringify(newBoard);

    if (!boardUnchanged) {
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = randomTwoOrFourTile();
      increaseMovesCount();
    }

    updateBoard(newBoard);

    if (hasTile(newBoard, maxTile)) signalGameWon();

    if (hasNoEmptyTile(newBoard) && this.detectEndOfGame(newBoard)) signalGameOver();

  };

  
playedUp = (boardValues) => {
  const { numberOfRows } = this.props;
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let indexes = [];
    let arrayOfRow = [];
    for (let i = 0; i < numberOfRows; i++) {
      let index = i * numberOfRows + row;
      indexes.push(index);
      arrayOfRow.push(board[index]);
    }
    const mergeResult = this.mergeLeftUp(arrayOfRow);
    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);

    // fill mergeArray with 0s
    const combine = [...mergeResult, ...arrayToConcat];

    for (let i = 0; i <= indexes.length; i++) {
      board[indexes[i]] = combine[i];
    }
  }

  return board;
};

playedRight = (boardValues) => {
  const { numberOfRows } = this.props;
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let startIndex = row * numberOfRows;
    let endIndex = row * numberOfRows + (numberOfRows - 1);
    const mergeResult = this.mergeDownRight(board.slice(startIndex, endIndex + 1));
    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);

    // fill mergeArray with 0s
    const combine = [...arrayToConcat, ...mergeResult];

    //updateState
    let y = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      board[i] = combine[y];
      y++;
    }
  }

  return board;
};

playedDown = (boardValues) => {
  const { numberOfRows } = this.props;
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let indexes = [];
    let arrayOfRow = [];
    for (let i = 0; i < numberOfRows; i++) {
      let index = i * numberOfRows + row;
      indexes.push(index);
      arrayOfRow.push(board[index]);
    }
    const mergeResult = this.mergeDownRight(arrayOfRow);
    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);
    const combine = [...arrayToConcat, ...mergeResult];

    for (let i = 0; i <= indexes.length; i++) {
      board[indexes[i]] = combine[i];
    }
  }

  return board;
};

playedLeft = (boardValues) => {
  const { numberOfRows } = this.props;
  let board = [...boardValues];


  for (let row = 0; row < numberOfRows; row++) {
    let startIndex = row * numberOfRows;
    let endIndex = row * numberOfRows + (numberOfRows - 1);
    const mergeResult = this.mergeLeftUp(board.slice(startIndex, endIndex + 1));

    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);
    const combine = [...mergeResult, ...arrayToConcat];

    let y = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      board[i] = combine[y];
      y++;
    }
  }

  return board;
};


/**
 * 
    MERGE LOGIC
 * 
 */

mergeLeftUp = (array) => {
  let nonZeroTiles = removeEmptyTiles(array);
  var mergedTiles = [];

  // we iterate throught non-zero array
  for (let i = 0; i < nonZeroTiles.length; i++) {

    // if we are at last index we automatically push (no merge possible)
    if (i === nonZeroTiles.length - 1) {
      mergedTiles.push(nonZeroTiles[i]);
    } 

    //check current index === next index
    else if (nonZeroTiles[i] === nonZeroTiles[i + 1]) {
      //if same we merge and skip next index
      mergedTiles.push(nonZeroTiles[i] * 2);
      i++;
    } else {

      // if they dont merge, try next index
      mergedTiles.push(nonZeroTiles[i]);
    }
  }
  return mergedTiles;
};

mergeDownRight = (array) => {

  let nonZeroTiles = removeEmptyTiles(array);

  var mergedTiles = [];

  // we iterate throught non-zero array
  for (let i = nonZeroTiles.length - 1; i >= 0; i--) {

    // if we are at last index we automatically push (no merge possible)
    if (i === 0) {
      mergedTiles.unshift(nonZeroTiles[i]);
    }
    
    //check current index === next index
    else if (nonZeroTiles[i] === nonZeroTiles[i - 1]) {
      //if same we merge and skip next index
      mergedTiles.unshift(nonZeroTiles[i] * 2);
      i--;
    } else {

      // if they dont merge, try next index
      mergedTiles.unshift(nonZeroTiles[i]);
    }
  }
  return mergedTiles;
};

detectEndOfGame = (boardValues) => {

  const initialBoard = [...boardValues];

  const playUp = this.playedUp(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playUp)) return false;

  const playRight = this.playedRight(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playRight)) return false;

  const playDown = this.playedDown(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playDown)) return false;

  const playLeft = this.playedLeft(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playLeft)) return false;

  return true;

};




render() {
  const { numberOfRows, boardValues, gameOver, gameWon } = this.props;

  const widthAndHeight =
    numberOfRows * (numberOfRows > 10 ? 50 : 100) + 10;


  const type = gameOver || gameWon ? "container board frozen" : "container board";

  return (
    <div className="wholeWindow" onKeyDown={this.handleKeyPressed} tabIndex={0}>
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
