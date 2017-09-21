# Sudoku Solver
A web app that helps you solve sudoku puzzles. It can check whether a puzzle is valid and can solve the puzzle for you.  
Been living under a rock? Read about sudoku [here](https://en.wikipedia.org/wiki/Sudoku)  

##Installation

All you need to do to get this site up and running on a local is a few simple commands:
```
 $ git clone https://github.com/nicholas-zeiss/sudoku.git
 $ cd sudoku/
 $ npm i
 $ npm start
```
That's it! Sudoku Solver will now be running on your localhost at port 3000.

##Implementation
The front-end consists of plain HTML, CSS, and JS. Note however that es6 syntax is widely used so before the JS is transpiled and bundled using babel and webpack. The backend runs off of express.