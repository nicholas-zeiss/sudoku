/**
 *  
 *  This module defines functions to check the validity of and solve a sudoku puzzle. It acts
 *  on a 9 by 9 2d array of numbers between 0 and 9 inclusive. 0 is considered blank.
 *
 *  N.B. the board supplied to these functions is not validated and an invalid board will throw errors
 *  
**/ 


/**
 *  
 *  This function solves the board in place, assuming it can be solved (ie it is valid),
 *  using a recursive backtracking algorithm. 
 *  
**/ 
function solve(board) {
	let empty = findUnassigned(board);
  
	//if no cell is empty the board is solved
	if (!empty) {
		return true;
	}

	let row = empty[0];
	let col = empty[1];

	//loop through all possible values empty cell could hold
	for (let i = 1; i < 10; i++) {

		//if i is valid at empty cell, set cell to i
		if (checkRow(board, row, col, i) && checkColumn(board, row, col, i) && checkGrid(board, row, col, i)) {   
			board[row][col] = i;

			//recurse on rest of board, if solve returns true we are done
			if (solve(board)) {                
				return true;
			}

			//no solution exists when cell is set to i, unset cell
			board[row][col] = 0;
		}
	}

	//no solution exists with the board as supplied as the argument in this call,
	//error lies higher in the callstack so return false
	return false;
}


//return coordinates of first empty cell found or false if board has no empty cells
function findUnassigned(board) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] == 0) {
				return [i, j];
			}
		}
	}

	return false;
}


//return whether row y is valid when the cell at row y column x is set to num
function checkRow(board, y, x, num) {
	for (let i = 0; i < 9; i++) {
		if (i != x && board[y][i] == num) {
			return false;
		}
	}

	return true;
}


//return whether column x is valid when the cell at row y column x is set to num
function checkColumn(board, y, x, num) {
	for (let j = 0; j < 9; j++) {
		if (j != y && board[j][x] == num) {
			return false;
		}
	}

	return true;
}


//return whether the 3x3 subgrid containing the cell at row y column x is valid when that cell is set to num
function checkGrid(board, y, x, num) {
	let baseX = 3 * Math.floor(x / 3);
	let baseY = 3 * Math.floor(y / 3);

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (!(j + baseY == y && i + baseX == x) && board[j + baseY][i + baseX] == num) {
				return false;
			}
		}
	}

	return true;
}


//return whether the board is valid
function isValid(board) {
	for (let i = 0; i < 9; i++) {
		let row = board[i].slice();
		let col = board.map(row => row[i]);

		let grid = board
			.filter((row, idx) => {
				return 3 * Math.floor(i / 3) <= idx && idx < 3 * (Math.floor(i / 3) + 1);
			})
			.map(row => {
				return row.slice(3 * (i % 3), 3 * (i % 3 + 1));
			})
			.reduce((arr, row) => {
				return arr.concat(row);
			});

		if (!validArray(row) || !validArray(col) || !validArray(grid)) {
			return false;
		}
	}

	return true;
}


//returns whether an array representing a row, column, or grid is valid
function validArray(arr) {
	return arr
		.filter(n => n)
		.reduce((acc, n) => {
			if (!acc[0] || acc[1].has(n)) {
				return [false, null];
			} else {
				return [true, acc[1].add(n)];
			}
		}, [true, new Set()])[0];
}


export { isValid, solve };

