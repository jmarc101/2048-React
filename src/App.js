import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";

const App = () => {

  //Setting useState for tile values
  const [boardValues, setBoardValues] = React.useState(newGameBoard)

  //Reinitialise for new game
  const newGame = () => {
    setBoardValues(newGameBoard)
    firstSquare()
  }

  const firstSquare = () => {
    let tile = Math.trunc(Math.random() * 16)
    
    setBoardValues(prevState => {
      let newBoard = [...prevState]
      newBoard[tile] = 2
      return newBoard
    })
    //console.log(tileValues);
  }

  const addRandomSquare = () => {
    let index = getRandomIndexFromEmptySquares(boardValues)

    setBoardValues(prevState => {
      let newBoard = [...boardValues]
      newBoard[index] = 2
      return newBoard
    })
  }
  

  // MARK: RENDER 
  return (
    <React.Fragment>
      <h1 className="gameTitle">2048</h1>
      <h3 className="titleSubSection">Joindres les tuiles pour avoir 2048</h3>
      <button className="btn" onClick={newGame} style={{marginRight: 50}} >Nouvelle Partie</button>
      <button className="btn" onClick={addRandomSquare} >Debug Generate random tile</button>
      <Board boardValues={boardValues} />
    </React.Fragment>
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
    if (e == 0) {
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
