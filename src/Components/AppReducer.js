import { newGameBoard, randomTwoOrFourTile, getFirstTile,
  removeEmptyTiles, hasTile, hasNoEmptyTile, 
  getRandomIndexFromEmptySquares } from "../Ressources/utilities.js";

const maxTile = 2048;



// STATE OBJECT
export const defaultState = {
  numberOfRows: 4,
  boardValues: newGameBoard(4),
  isFirstGame: true,
  movesCount: 0,
  gameWon: false,
  gameOver: false,
  action: null,
};

// REDUCER
export const AppReducer = (state, action) => {
  let initialBoard = [];
  let newBoard = [];
  let boardUnchanged = false;

  switch (action.type) {
    case "NEW_GAME":
      //new game
      newBoard = newGameBoard(state.numberOfRows);
      newBoard[getFirstTile(state.numberOfRows)] = randomTwoOrFourTile();
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = randomTwoOrFourTile();
      return { 
        ...state, 
        boardValues: newBoard, 
        isFirstGame: false, 
        movesCount: 0, 
        gameWon: false,
        gameOver: false,
        action: null,
      };

    case "CHANGE_ROW_VALUE":
      return {
        ...state,
        boardValues: newGameBoard(action.payload),
        numberOfRows: action.payload,
        isFirstGame: true,
        movesCount: 0, 
        gameWon: false,
        gameOver: false,
        action: null,
      };

    case "MOVE_UP":
    case "MOVE_RIGHT":
    case "MOVE_DOWN":
    case "MOVE_LEFT":

      initialBoard = JSON.parse(JSON.stringify(state.boardValues));

      if (action.type === "MOVE_UP") newBoard = playedUp(state);
      if (action.type === "MOVE_RIGHT") newBoard = playedRight(state);
      if (action.type === "MOVE_DOWN") newBoard = playedDown(state);
      if (action.type === "MOVE_LEFT") newBoard = playedLeft(state);

      boardUnchanged = JSON.stringify(initialBoard) === JSON.stringify(newBoard);

      if (!boardUnchanged) newBoard[getRandomIndexFromEmptySquares(newBoard)] = randomTwoOrFourTile();

      return { 
        ...state, 
        boardValues: newBoard, 
        movesCount: boardUnchanged ? state.movesCount : state.movesCount++, 
        gameWon: hasTile(newBoard, maxTile),
        gameOver: hasNoEmptyTile(newBoard) ? detectEndOfGame({...state, boardValues: newBoard}) : false,
        action: action.type,
      };

    default:
      break;
  }
};

/*  KEY PRESS LOGIC
 */
// action when we press buttons

const playedUp = (state) => {
  let board = [...state.boardValues];

  for (let row = 0; row < state.numberOfRows; row++) {
    let indexes = [];
    let arrayOfRow = [];
    for (let i = 0; i < state.numberOfRows; i++) {
      let index = i * state.numberOfRows + row;
      indexes.push(index);
      arrayOfRow.push(board[index]);
    }
    const mergeResult = mergeLeftUp(arrayOfRow);
    let arrayToConcat = new Array(state.numberOfRows - mergeResult.length).fill(0);

    // fill mergeArray with 0s
    const combine = [...mergeResult, ...arrayToConcat];

    for (let i = 0; i <= indexes.length; i++) {
      board[indexes[i]] = combine[i];
    }
  }

  return board;
};

const playedRight = (state) => {
  let board = [...state.boardValues];

  for (let row = 0; row < state.numberOfRows; row++) {
    let startIndex = row * state.numberOfRows;
    let endIndex = row * state.numberOfRows + (state.numberOfRows - 1);
    const mergeResult = mergeDownRight(board.slice(startIndex, endIndex + 1));
    let arrayToConcat = new Array(state.numberOfRows - mergeResult.length).fill(0);

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

const playedDown = (state) => {
  let board = [...state.boardValues];

  for (let row = 0; row < state.numberOfRows; row++) {
    let indexes = [];
    let arrayOfRow = [];
    for (let i = 0; i < state.numberOfRows; i++) {
      let index = i * state.numberOfRows + row;
      indexes.push(index);
      arrayOfRow.push(board[index]);
    }
    const mergeResult = mergeDownRight(arrayOfRow);
    let arrayToConcat = new Array(state.numberOfRows - mergeResult.length).fill(0);
    const combine = [...arrayToConcat, ...mergeResult];

    for (let i = 0; i <= indexes.length; i++) {
      board[indexes[i]] = combine[i];
    }
  }

  return board;
};

const playedLeft = (state) => {
  let board = [...state.boardValues];


  for (let row = 0; row < state.numberOfRows; row++) {
    let startIndex = row * state.numberOfRows;
    let endIndex = row * state.numberOfRows + (state.numberOfRows - 1);
    const mergeResult = mergeLeftUp(board.slice(startIndex, endIndex + 1));

    let arrayToConcat = new Array(state.numberOfRows - mergeResult.length).fill(0);
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

const mergeLeftUp = (array) => {
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

const mergeDownRight = (array) => {

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

const detectEndOfGame = (state) => {

  const board = [...state.boardValues];
  const initialBoard = JSON.parse(JSON.stringify(board));

  const playUp = playedUp(state);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playUp)) return false;

  const playRight = playedRight(state);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playRight)) return false;

  const playDown = playedDown(state);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playDown)) return false;

  const playLeft = playedLeft(state);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playLeft)) return false;

  return true;

};

