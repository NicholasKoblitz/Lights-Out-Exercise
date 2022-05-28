import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=4, ncols=4, chanceLightStartsOn=1.0 }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    let row = [];
    for(let i = 0; i < ncols; i++) {
      for(let j = 0; j < nrows; j++) {
        let random = Math.random() * chanceLightStartsOn;
        random >= chanceLightStartsOn/2 ? row.push(true) : row.push(false);
      }
      initialBoard.push(row)
      row = [];
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let checkboard = [];
    board.map(r => (
      r.map(i => (
        checkboard.push(i)
      ))
    ))
        // console.log(board)
        // console.log(checkboard)
    for(let val of checkboard)  {
      if(val === false) {
        return false
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
       

      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy

      let copiedBoard = []
      // console.log(oldBoard)
      oldBoard.map(r => copiedBoard.push(r))
      // console.log(copiedBoard)

      // Checks the selected cell
      flipCell(y, x, copiedBoard)
      // Checks cell to the top
      flipCell(y - 1, x, copiedBoard)
      // Checks cell to the bottom
      flipCell(y + 1, x, copiedBoard)
      // Checks cell to the left
      flipCell(y, x - 1, copiedBoard)
      // Checks cell to the right
      flipCell(y, x + 1, copiedBoard)

      return copiedBoard
      // console.log("yes")
      
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  let isWinner = hasWon();

  if(isWinner) {
    return <h2>You Won!</h2>
  }
  else {
    return (
      <>
      <table>
        <tbody>
          {board.map((r,i1) => 
            <tr key={i1} >{r.map((v, i2) => 
              <Cell isLit={v === true ? true : false } flipCellsAroundMe={() => flipCellsAround(`${i1}-${i2}`)} key={i2}/>)}
            </tr>)}
        </tbody>
      </table>
    </>
    )
  }
  
}

export default Board;
