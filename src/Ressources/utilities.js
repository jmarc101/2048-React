// TILE LOGIC

// Create new boardValues Array
export const newGameBoard = (numberOfRows) => new Array(numberOfRows * numberOfRows).fill(0);

export const randomTwoOrFourTile = () => Math.pow(2, Math.trunc(Math.random() * 2 + 1));

// get a random first tile for empty board
export const getFirstTile = (numberOfRows) => Math.trunc(Math.random() * Math.pow(numberOfRows, 2));

// returns all non-zero tiles
export const removeEmptyTiles = (array) => array.filter((tile) => tile !== 0)

// checks if array has a maximum value tile
export const hasTile = (array, tile) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === tile) return true;
  }
  return false;
}

// checks if array has no empty tile left
export const hasNoEmptyTile = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) return false;
  }
  return true;
}

// checks all empty squares and return a random index of one of them
export const getRandomIndexFromEmptySquares = (board) => {
  let emptyTiles = [];
  board.forEach((e, index) => {
    if (e === 0) {
      emptyTiles.push(index);
    }
  });
  return emptyTiles[Math.trunc(Math.random() * emptyTiles.length)];
};