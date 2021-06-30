// STATE OBJECT
export const defaultState = {
  numberOfRows: 2,
  boardValues: [0, 0, 0, 0],
  isFirstGame: true,
};

// REDUCER
export const AppReducer = (state, action) => {
  console.log("inRefucer");
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
      break;

    case "MOVE_RIGHT":
      //swipt right
      playedRight();
      break;

    case "MOVE_DOWN":
      playedDown();
      break;

    case "MOVE_LEFT":
      playedLeft();
      break;

    case "DEBUG":
      let board = [...state.boardValues];
      board[getRandomIndexFromEmptySquares(board)] = 1024;
      return { ...state, boardValues: board };

    default:
      break;
  }
};

// TILE LOGIC

const newGameBoard = (numberOfRows) =>
  new Array(numberOfRows * numberOfRows).fill(0);
const getFirstTile = (numberOfRows) =>
  Math.trunc(Math.random() * Math.pow(numberOfRows, 2));
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
const playedLeft = () => {};

const playedUp = () => {};

const playedRight = () => {};

const playedDown = () => {};
