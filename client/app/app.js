$(document).ready(function() {
	//create the internal representation of the sudoku board
	var table = new Array(9).fill(1).map(el => new Array(9).fill(0));

	//create our actual sudoku board on the page
	for (var i = 0; i < 9; i++) {
		$("table").append("<tr id='row-" + i + "'</tr>");
		for (var j = 0; j < 9; j++) {
			$("#row-" + i).append('<td><input type="text" placeholder="0" maxLength="1" size="1" id="col-' + i + j + '"/></td>');
		}
	}

	//hide all output until they need to be seen
	$("#messages >").hide();
	$("#placeholder").show();

	//checks the validity of the table
	$("#checkValid").on('click', function() {
    $("#messages >").hide();
		
		updateTable();
		
		if (isValid(table)) {
			$("#valid").show();
		} else {
			$("#invalid").show();
		}
	});

	//solves the table and shows the solution
	$("#showSolution").on('click', function() {
    $("#messages >").hide();
    
    updateTable();
    
    if (!isValid(table)) {
    	$("#warning").show()
    } else if (solve(table)) {
    	$("#solved").show()
    
    	loop(function(entry, i, j) {
    		entry.val(table[i][j]);
    	})
    } else {
    	$("#unsolved").show();
    }
	});

	//clears the board
	$("#clearBoard").on('click', function() {
		$("#messages >").hide();
		
		loop(function(entry) {
			entry.val(0)
		})
	});
	
	//loops over the sudoku board, the arguments for the callback are input element, row, and col
	function loop(cb) {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				cb($("#row-" + i).find("#col-" + i + j), i, j);
			}
		}
	}

	//sets the board to match the input
	function updateTable() {
		loop(function(entry, i, j) {
			table[i][j] = Number(entry.val()) || 0;			//if the value of the input element is not a number default to 0
		});
	}
})
