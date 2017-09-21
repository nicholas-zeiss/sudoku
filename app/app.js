/**
 *	
 *	Initializes the app and serves as glue between the view/controls and the logic for solving the board
 *	
**/ 


import $ from 'jquery';
import { isValid, solve } from './solver';


$(document).ready(function() {
	//our puzzle model
	let table = new Array(9).fill(1).map(() => new Array(9).fill(0));


	//render view for the puzzle model
	for (let i = 0; i < 9; i++) {
		$('table').append(`<tr id="row-${i}"></tr>`);
		
		for (let j = 0; j < 9; j++) {
			$('#row-' + i).append(`<td><input type="text" placeholder="0" maxLength="1" size="1" id="col-${i}${j}" onFocus="this.select()"/></td>`);
		}
	}


	//hide output messages until needed
	$('#messages >').hide();
	$('#placeholder').show();


	//checks the validity of the puzzle
	$('#checkValid').on('click', () => {
		$('#messages >').hide();
		
		updateTable();
		
		isValid(table) ? $('#valid').show() : $('#invalid').show();
	});


	//solves puzzle, shows solution
	$('#showSolution').on('click', () => {
		$('#messages >').hide();
    
		updateTable();
    
		if (!isValid(table)) {
			$('#warning').show();
		
		} else if (solve(table)) {
			$('#solved').show();
			loop((cell, i, j) => cell.val(table[i][j]));
		
		} else {
			$('#unsolved').show();
		}
	});


	//clears the puzzle
	$('#clearBoard').on('click', () => {
		$('#messages >').hide();
		
		loop(cell => cell.val(0));
	});
	

	//loops over the sudoku board input elements and executes a callback
	function loop(cb) {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				cb($('#row-' + i).find('#col-' + i + j), i, j);
			}
		}
	}


	//updates model to match view, if cell value is not a digit it defaults to 0 which is considered blank
	function updateTable() {
		loop((cell, i, j) => table[i][j] = Number(cell.val()) || 0);
	}
});

