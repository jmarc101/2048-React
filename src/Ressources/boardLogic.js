import { removeEmptyTiles } from "./utilities";

export const playedUp = (boardValues, numberOfRows) => {
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let indexes = [];
    let arrayOfRow = [];
    for (let i = 0; i < numberOfRows; i++) {
      let index = i * numberOfRows + row;
      indexes.push(index);
      arrayOfRow.push(board[index]);
    }
    const mergeResult = mergeLeftUp(arrayOfRow);
    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);

    // fill mergeArray with 0s
    const combine = [...mergeResult, ...arrayToConcat];

    for (let i = 0; i <= indexes.length; i++) {
      board[indexes[i]] = combine[i];
    }
  }

  return board;
};

export const playedRight = (boardValues, numberOfRows) => {
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let startIndex = row * numberOfRows;
    let endIndex = row * numberOfRows + (numberOfRows - 1);
    const mergeResult = mergeDownRight(board.slice(startIndex, endIndex + 1));
    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);

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

export const playedDown = (boardValues, numberOfRows) => {
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let indexes = [];
    let arrayOfRow = [];
    for (let i = 0; i < numberOfRows; i++) {
      let index = i * numberOfRows + row;
      indexes.push(index);
      arrayOfRow.push(board[index]);
    }
    const mergeResult = mergeDownRight(arrayOfRow);
    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);
    const combine = [...arrayToConcat, ...mergeResult];

    for (let i = 0; i <= indexes.length; i++) {
      board[indexes[i]] = combine[i];
    }
  }

  return board;
};

export const playedLeft = (boardValues, numberOfRows) => {
  let board = [...boardValues];

  for (let row = 0; row < numberOfRows; row++) {
    let startIndex = row * numberOfRows;
    let endIndex = row * numberOfRows + (numberOfRows - 1);
    const mergeResult = mergeLeftUp(board.slice(startIndex, endIndex + 1));

    let arrayToConcat = new Array(numberOfRows - mergeResult.length).fill(0);
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

export const mergeLeftUp = (array) => {
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

export const mergeDownRight = (array) => {
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

export const detectEndOfGame = (boardValues) => {
  const initialBoard = [...boardValues];

  const playUp = playedUp(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playUp)) return false;

  const playRight = playedRight(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playRight)) return false;

  const playDown = playedDown(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playDown)) return false;

  const playLeft = playedLeft(boardValues);
  if (JSON.stringify(initialBoard) !== JSON.stringify(playLeft)) return false;

  return true;
};
