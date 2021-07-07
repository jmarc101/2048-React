import React from "react";
import "./App.css";
import Board from "./Components/Board";
import Header from './Components/Header';
import { newGameBoard, randomTwoOrFourTile, 
  getFirstTile,getRandomIndexFromEmptySquares } from "./Ressources/utilities.js";


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


  render () {
    const { numberOfRows, boardValues, movesCount, isFirstGame, gameWon, gameOver } = this.state;

    return (
          <div className="container mt-5 text-center">

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
              updateBoard={this.updateBoard}
              isFirstGame={isFirstGame}
              increaseMovesCount={this.increaseMovesCount}
              toggleNewGame={this.toggleNewGame}
              gameWon={gameWon}
              gameOver={gameOver}
              signalGameWon={this.signalGameWon}
              signalGameOver={this.signalGameOver}
            />
          </div>
    );  
  } 

}

export default App;
