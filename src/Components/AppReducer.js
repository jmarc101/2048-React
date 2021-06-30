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
      newBoard = playedUp(state)
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2
      return {...state, boardValues: newBoard}
      

    case "MOVE_RIGHT":
      //swipt right
      newBoard = playedRight(state)
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2
      return {...state, boardValues: newBoard}


    case "MOVE_DOWN":
      newBoard = playedDown(state)
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2
      return {...state, boardValues: newBoard}

    case "MOVE_LEFT":
      newBoard = playedLeft(state)
      newBoard[getRandomIndexFromEmptySquares(newBoard)] = 2
      return {...state, boardValues: newBoard}

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

const removeEmptyTiles = (array) => {
  let nonEmptyTiles = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 0) nonEmptyTiles.push(array[i]);
  }
  return nonEmptyTiles;
};

const merge = (array) => {
  let nonEmptyTiles = removeEmptyTiles(array);
  var mergedRow = []; // sourceRow after it was merged

  for (let i = 0; i < nonEmptyTiles.length; i++) {
    // after all elements were pushed we push the last element because there is no element after to be merged with
    if (i === nonEmptyTiles.length - 1) mergedRow.push(nonEmptyTiles[i]);
    // comparing if values are mergeable
    else if (nonEmptyTiles[i] === nonEmptyTiles[i + 1]) {
      // elements got merged so a new element appears and gets incremented
      // skip one element(i++) because it got merged
      mergedRow.push(nonEmptyTiles[i] * 2);
      i++;
    } else {
      // no merge, so follow normal order
      mergedRow.push(nonEmptyTiles[i]);
    }
  }

  return mergedRow;
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

    let rowArray = merge(arrayOfRow);
    let arrayToConcat = new Array(state.numberOfRows - rowArray.length).fill(0);
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
    let rowArray = merge(board.slice(startIndex, endIndex + 1));

    let arrayToConcat = new Array(state.numberOfRows - rowArray.length).fill(0);
    const combine = [...arrayToConcat, ...rowArray];

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

    let rowArray = merge(arrayOfRow);
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
    let rowArray = merge(board.slice(startIndex, endIndex + 1));

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

