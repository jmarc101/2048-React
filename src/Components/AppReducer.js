// STATE OBJECT
export const defaultState = {
  numberOfRows: 2,
  boardValues: [0, 0, 0, 0],
  isFirstGame: true,
};

// REDUCER
export const AppReducer = (state, action) => {

  switch (action.type) {
    case "NEW_GAME":
      //new game
      let newBoard = newGameBoard(state.numberOfRows);
      newBoard[getFirstTile(state.numberOfRows)] = 2;
      return { ...state, boardValues: newBoard, isFirstGame: false };

    case "CHANGE_ROW_VALUE":
      console.log(state.numberOfRows);
      return {
        ...state,
        boardValues: newGameBoard(action.payload),
        numberOfRows: action.payload,
        isFirstGame: true,
      };

    case "MOVE_UP":
      //swipe up
      playedUp();
      return state;
      

    case "MOVE_RIGHT":
      //swipt right
      playedRight();
      return state;

    case "MOVE_DOWN":
      playedDown();
      return state;

    case "MOVE_LEFT":
      playedLeft();
      return state;

    case "DEBUG":
      let board = [...state.boardValues];
      board[getRandomIndexFromEmptySquares(board)] = randomSquareNumber();
      return { ...state, boardValues: board };

    default:
      break;
  }
};

// TILE LOGIC

// Create new boardValues Array
const newGameBoard = (numberOfRows) => new Array(numberOfRows * numberOfRows).fill(0);

//generate randomSquareNumber
const randomSquareNumber = () => Math.pow(2, Math.trunc(Math.random() * 11) + 1);

// get a random first tile for empty board
const getFirstTile = (numberOfRows) => Math.trunc(Math.random() * Math.pow(numberOfRows, 2));

// checks all empty squares and return a random index of one of them
const getRandomIndexFromEmptySquares = (board) => {
  let emptyTiles = [];
  board.forEach((e, index) => {
    if (e === 0) {
      emptyTiles.push(index);
    }
  });
  return emptyTiles[Math.trunc(Math.random() * emptyTiles.length)];
};



/*  KEY PRESS LOGIC
 */
// action when we press buttons
const playedLeft = () => {
  console.log("pressed left");
};

const playedUp = () => {
  console.log("pressed up");
};

const playedRight = () => {
  console.log("pressed right");
};

const playedDown = () => {
  console.log("pressed down");
};
