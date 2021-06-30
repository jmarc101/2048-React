// STATE OBJECT
export const defaultState = {
  numberOfRows: 2,
  boardValues: [0, 0, 0, 0],
  isFirstGame: true,
};

// REDUCER
export const AppReducer = (state, action) => {
  let newBoard = [];
  switch (action.type) {
    case "NEW_GAME":
      //new game
      newBoard = newGameBoard(state.numberOfRows);
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
      newBoard = playedUp(state);
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2;
      return { ...state, boardValues: newBoard };

    case "MOVE_RIGHT":
      //swipt right
      newBoard = playedRight(state);
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2;
      return { ...state, boardValues: newBoard };

    case "MOVE_DOWN":
      newBoard = playedDown(state);
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2;
      return { ...state, boardValues: newBoard };

    case "MOVE_LEFT":
      newBoard = playedLeft(state);
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2;
      return { ...state, boardValues: newBoard };

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

// returns all non-zero tiles
const removeEmptyTiles = (array) => array.filter((tile) => tile !== 0)

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

    let rowArray = mergeLeftUp(arrayOfRow);
    let arrayToConcat = new Array(state.numberOfRows - rowArray.length).fill(0);

    // fill mergeArray with 0s
    const combine = [...rowArray, ...arrayToConcat];

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
    let rowArray = mergeDownRight(board.slice(startIndex, endIndex + 1));
    let arrayToConcat = new Array(state.numberOfRows - rowArray.length).fill(0);

    // fill mergeArray with 0s
    const combine = [...arrayToConcat, ...rowArray];

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

    let rowArray = mergeDownRight(arrayOfRow);
    let arrayToConcat = new Array(state.numberOfRows - rowArray.length).fill(0);
    const combine = [...arrayToConcat, ...rowArray];

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
    let rowArray = mergeLeftUp(board.slice(startIndex, endIndex + 1));

    let arrayToConcat = new Array(state.numberOfRows - rowArray.length).fill(0);
    const combine = [...rowArray, ...arrayToConcat];

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
    if (i === nonZeroTiles.length - 1) mergedTiles.push(nonZeroTiles[i]);

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
    if (i === 0) mergedTiles.unshift(nonZeroTiles[i]);
    
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

