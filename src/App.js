import React from "react";
import "./App.css";
import Board from "./Components/Board";
import useKeypress from "react-use-keypress";


const App = () => {
  //Setting useState for tile values
  const [boardValues, setBoardValues] = React.useState(newGameBoard);

  //handle keypress
  useKeypress(["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"], (e) => {
    switch (e.key) {
      case "ArrowLeft": // LEFT
        playedLeft(setBoardValues)
        break;
      case "ArrowUp": // UP
        playedUp(setBoardValues)
        break;
      case "ArrowRight": // RIGHT
        playedRight(setBoardValues)
        break;
      case "ArrowDown": //Down
        playedDown(setBoardValues)
        break;
      default:
        break;
    }
  });

  // MARK: RENDER
  return <React.Fragment>
    <div className="container mt-5 text-center">
      <h1 className="text-success title">2048</h1>
      <h3>Joindres les tuiles pour avoir 2048</h3>
      <button
        className="btn btn-success my-3 me-5"
        onClick={() => newGame(setBoardValues)}>
      Nouvelle Partie 
      </button>
      <button
        className="btn btn-success my-3"
        onClick={() => addRandomSquare([boardValues, setBoardValues])}>
      Debug Generate random tile
      </button>
      <Board boardValues={boardValues} />
    </div>
  </React.Fragment>  
};





// GAME LOGIC

//initial board
 // [0,   0,   0,   0,
  // 0,   0,   0,   0,
  // 0,   0,   0,   0,
  // 0,   0,   0,   0]
const newGameBoard = new Array(16).fill(0);

 //Reinitialise for new game
 const newGame = (setBoardValues) => {
  setBoardValues(newGameBoard);
  
  let firstTile = Math.trunc(Math.random() * 16);
  setBoardValues(prevState => {
    let newBoard = [...prevState];
      newBoard[firstTile] = 2;
      return newBoard;
  })
}


// add 2 to a random empty square
const addRandomSquare = ([state, setState]) => {
  let index = getRandomIndexFromEmptySquares(state);

  setState((prevState) => {
    let newBoard = [...prevState];
    newBoard[index] = 4;
    return newBoard;
  });
};

const getRandomIndexFromEmptySquares = (board) => {
  let emptyTiles = []
  board.forEach((e, index) => {
    if (e === 0) {
      emptyTiles.push(index)
    }
  });
return emptyTiles[Math.trunc(Math.random() * emptyTiles.length)];
}



/*  KEY PRESS LOGIC
*/
// action when we press buttons
const playedLeft = (setState) => {
  setState(prevState => {
    let board = [...prevState]
    board[0] = 4
    return board
  })
};

const playedUp = (setState) => {
  setState(prevState => {
    let board = [...prevState]
    board[1] = 4
    return board
  })
};

const playedRight = (setState) => {
  setState(prevState => {
    let board = [...prevState]
    board[2] = 4
    return board
  })
};

const playedDown = (setState) => {
  setState(prevState => {
    let board = [...prevState]
    board[3] = 4
    return board
  })
};

export default App;
