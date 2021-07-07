import React from "react";
import "./App.css";
import Board from "./Components/Board";
import Header from './Components/Header';
import { newGameBoard, randomTwoOrFourTile, 
  getFirstTile,getRandomIndexFromEmptySquares, hasTile, hasNoEmptyTile } from "./Ressources/utilities.js";
import { playedUp, playedDown, playedLeft, playedRight, detectEndOfGame } from "./Ressources/boardLogic";


    const maxTile = 2048;
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOfRows: 4,
      boardValues: newGameBoard(4),
      movesCount: 0,
      isFirstGame: true,
      gameOver: false,
      gameWon: false,
    };
  }

  toggleNewGame = () => {

    const { numberOfRows } =  this.state;

    const newBoard = newGameBoard(numberOfRows);
    newBoard[getFirstTile(numberOfRows)] = randomTwoOrFourTile();
    newBoard[getRandomIndexFromEmptySquares(newBoard)] = randomTwoOrFourTile();

    this.setState({
      boardValues: newBoard,
      movesCount: 0,
      isFirstGame: false,
      gameOver: false,
      gameWon: false,
    });
  }

  changeNumberOfRow = num => this.setState({
    numberOfRows: num,
    boardValues: newGameBoard(num),
    movesCount: 0,
    isFirstGame: true,
    gameOver: false,
    gameWon: false,
  });

  increaseMovesCount = () => {
    let { movesCount } = this.state;
    this.setState({movesCount: movesCount + 1});
  }
  updateBoard = (newBoard) => this.setState({boardValues: newBoard});
  signalGameWon = () => this.setState({gameWon: true});
  signalGameOver = () => this.setState({gameOver: true});

  handleKeyPressed = e => {

    const { isFirstGame, boardValues, numberOfRows,
    signalGameOver, signalGameWon, gameOver, gameWon } = this.state;

    if (gameOver || gameWon || isFirstGame) return;

    const initialBoard = [...boardValues];
    let newBoard;

    switch (e.key) {
      case "ArrowLeft": 
        newBoard = playedLeft(boardValues, numberOfRows);
        break;
      case "ArrowUp": 
        newBoard = playedUp(boardValues, numberOfRows);
        break
      case "ArrowRight": 
        newBoard = playedRight(boardValues, numberOfRows);
        break;
      case "ArrowDown": 
        newBoard = playedDown(boardValues, numberOfRows);
        break;
      default:
        return;
    }

    const boardUnchanged = JSON.stringify(initialBoard) === JSON.stringify(newBoard);

    if (!boardUnchanged) {
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = randomTwoOrFourTile();
      this.increaseMovesCount();
    }

    this.updateBoard(newBoard);
    if (hasTile(newBoard, maxTile)) signalGameWon();
    if (hasNoEmptyTile(newBoard) && detectEndOfGame(newBoard)) signalGameOver();
  };

  render () {
    const { numberOfRows, boardValues, movesCount, isFirstGame, gameWon, gameOver } = this.state;

    return (
          <div className="container mt-5 text-center" onKeyDown={this.handleKeyPressed} tabIndex={0}>

            <Header 
              changeNumberOfRow={this.changeNumberOfRow} 
              numberOfRows={numberOfRows}
              movesCount={movesCount}
              isFirstGame={isFirstGame}
              toggleNewGame={this.toggleNewGame}
            />

            <Board
              numberOfRows={numberOfRows}
              boardValues={boardValues}
              gameWon={gameWon}
              gameOver={gameOver}
            />
          </div>
    );  
  } 

}

export default App;
