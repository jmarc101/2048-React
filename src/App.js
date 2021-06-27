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
        setBoardValues((prevState) => {
          let oldBoardValues = [...prevState];
          return playedLeft(oldBoardValues);
        });
        break;
      case "ArrowUp": // UP
        setBoardValues((prevState) => {
          let oldBoardValues = [...prevState];
          return playedUp(oldBoardValues);
        });
        break;
      case "ArrowRight": // RIGHT
        setBoardValues((prevState) => {
          let oldBoardValues = [...prevState];
          return playedRight(oldBoardValues);
        });
        break;
      case "ArrowDown": //Down
        setBoardValues((prevState) => {
          let oldBoardValues = [...prevState];
          return playedDown(oldBoardValues);
        });
        break;
      default:
        break;
    }
  });

  //Reinitialise for new game
  const newGame = () => {
    setBoardValues(newGameBoard);
    firstSquare()

  };

  // first square of the game
  const firstSquare = () => {
    let tile = Math.trunc(Math.random() * 16);
  
      setBoardValues((prevState) => {
        let newBoard = [...prevState];
        newBoard[tile] = 2;
        return newBoard;
      });
  };

  // add 2 to a random empty square
  const addRandomSquare = () => {
    let index = getRandomIndexFromEmptySquares(boardValues);

    setBoardValues((prevState) => {
      let newBoard = [...prevState];
      newBoard[index] = 4;
      return newBoard;
    });
  };

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

// action when we press buttons
const playedLeft = (values) => {
  values[2] = 4;
  
  return values;
};

const playedUp = (values) => {
  values[3] = 8;
  console.log("pressed up");
  
  return values
};

const playedRight = (values) => {
  values[4] = 16;
  return values
};

const playedDown = (values) => {
  values[5] = 32;
  console.log("pressed down");
  return values
};
export default App;
