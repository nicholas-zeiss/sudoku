//note: all of these functions assume a 9x9 board with numerical entries between 0 and 9, inclusive

//this function solves the board using a recursive backtracking algorithm, it alters the board in place and assumes the board is valid
function solve(board, row, col) {
  var res = hasUnassigned(board);
  
  //if no cell is unassigned the board is solved
  if (!res[0]) {
    return true;
  }

  //store the coordinates of the first unassigned cell
  row = res[1];
  col = res[2];

  //loop through all possible entries
  for (var i = 1; i < 10; i++) {
    if (checkRow(board, row, col, i) && checkColumn(board, row, col, i) && checkGrid(board, row, col, i)) {   
      //if i is a valid entry, make the move and recursively solve the remaining unassigned cells
      board[row][col] = i;
      
      if (solve(board, row, col)) {                
        //inserting i at this cell leads to a solution, the board is now solved
        return true;
      }

      //inserting i at this cell does not lead to a solution, undo the move and try the next number
      board[row][col] = 0;
    }
  }

  //if there are unassigned cells but the above loop cannot find a solution one of the previous assignments
  //must be at fault, we must move backward
  return false;
}

//finds the first empty cell, going left to right and up to down
//returns an array with the first element being a boolean representing if there is an empty cell
//if there is an empty cell, the next two elements of the array are the x and y coordinate
function hasUnassigned(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        return [true, i, j];
      }
    }
  }
  return [false];
}

//returns whether inserting num at cell x of row y yields a valid row
function checkRow(board, y, x, num) {
  for (var i = 0; i < 9; i++) {
    if (i != x && board[y][i] == num) {
      return false;
    }
  }
  return true;
}

//returns whether inserting num at cell x of row y yields a valid column
function checkColumn(board, y, x, num) {
  for (var j = 0; j < 9; j++) {
    if (j !== y && board[j][x] == num) {
      return false;
    }
  }
  return true;
}

//returns whether inserting num at cell x of row y yields a valid 3x3 subgrid
function checkGrid(board, y, x, num) {
  var baseX = 3 * Math.floor(x / 3);
  var baseY = 3 * Math.floor(y / 3);

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (!(j + baseY == y && i + baseX == x) && board[j + baseY][i + baseX] == num) {
        return false;
      }
    }
  }
  return true;
}

//determines whether the board is valid
function isValid(board) {
  for (var i = 0; i < 9; i++) {
    var row = board[i].slice();   //slice so that we create a shallow copy, otherwise board will be altered when pass row to validArray()
    
    var col = board.map(row => row[i]);

    var grid = board.filter((row, idx) => 3 * Math.floor(i / 3) <= idx && idx < 3 * (Math.floor(i / 3) + 1))  //filter out undesired rows
                    .map(row => row.slice(3 * (i % 3), 3 * (i % 3 + 1)))                                      //reduce each row to desired subsection        
                    .reduce((arr, row) => arr.concat(row));                                                   //flatten

    if (!validArray(row) || !validArray(col) || !validArray(grid)) {
      return false;
    }
  }

  return true;

  //checks if an array representing a row, column, or grid is valid
  function validArray(arr) {
    arr.sort((a,b) => a - b);

    for (var i = 0; i < 9; i++) {
      if (arr[i] == 0) {
        continue;
      } else if (arr[i-1] !== undefined && arr[i] <= arr[i-1]) {  //if arr[i] is nonzero and there is a preceding number, arr[i] must be greater
        return false;
      }
    }

    return true;
  }
}