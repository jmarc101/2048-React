import React from "react";
import "./App.css";
import Board from "./Components/Board";


const App = () => {

  //Setting useState for tile values
  const [boardValues, setBoardValues] = React.useState(newGameBoard)

  //Reinitialise for new game
  const newGame = () => {
    setBoardValues(newGameBoard)
    firstSquare()
  }

  // first square of the game
  const firstSquare = () => {
    let tile = Math.trunc(Math.random() * 16)
    
    setBoardValues(prevState => {
      let newBoard = [...prevState]
      newBoard[tile] = 2;
      return newBoard
    })
  }

  // add 2 to a random empty square
  const addRandomSquare = () => {
    let index = getRandomIndexFromEmptySquares(boardValues)

    setBoardValues(prevState => {
      let newBoard = [...prevState];
      newBoard[index] = 2048;
      return newBoard
    })
  }
  

  // MARK: RENDER 
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-success title">2048</h1>
      <h3>Joindres les tuiles pour avoir 2048</h3>
      <button className="btn btn-success my-3 me-5" onClick={newGame}>
        Nouvelle Partie
      </button>
      <button className="btn btn-success my-3" onClick={addRandomSquare}>
        Debug Generate random tile
      </button>
      <Board boardValues={boardValues} />
    </div>
  );
};

// GAME LOGIC

//initial board
 // [0,   0,   0,   0,
  // 0,   0,   0,   0,
  // 0,   0,   0,   0,
  // 0,   0,   0,   0]
const newGameBoard = new Array(16).fill(0);

const getRandomIndexFromEmptySquares = (board) => {
  let emptyTiles = []
  board.forEach((e, index) => {
    if (e === 0) {
      emptyTiles.push(index)
    }
  });
return emptyTiles[Math.trunc(Math.random() * emptyTiles.length)]

}


const handleKeyDown = (e) => {

  switch (e.keyCode) {
    case 37: // LEFT
      playedLeft()
      break;
    case 38: // UP
      playedUp();
      break;
    case 39: // RIGHT
      playedRight();
      break;
    case 40: //Down
      playedDown();
      break;
    default:
      break;
  }
};

const playedLeft = () => {

}

const playedUp = () => {
  
}

const playedRight = () => {
  
}

const playedDown = () => {
  
}
export default App;
