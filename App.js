// SudokuSolver.js
import React, { useState } from 'react';
import './App.css';  // Import the CSS file

const SudokuSolver = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill('')));
  const [error, setError] = useState('');

  // Helper function to check if a number can be placed in a specific cell
  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num || 
          board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
        return false;
      }
    }
    return true;
  };

  // Validation function for checking the initial board state
  const validateBoard = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = board[i][j];
        if (value !== '' && !isValid(board, i, j, value)) {
          return false;
        }
      }
    }
    return true;
  };

  // Recursive backtracking function to solve the puzzle
  const solveSudoku = () => {
    const solve = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === '') {
            for (let num = '1'; num <= '9'; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (solve(board)) return true;
                board[row][col] = '';
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const newBoard = board.map(row => row.slice());
    if (solve(newBoard)) {
      setBoard(newBoard);
      setError('');
    } else {
      setError('No solution exists for the given puzzle.');
    }
  };

  // Handle input change and update the board
  const handleInputChange = (row, col, value) => {
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = board.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
      );
      setBoard(newBoard);
    }
  };

  // Handle validation of the current board state
  const handleValidate = () => {
    if (validateBoard()) {
      setError('');
      alert('The current board is valid!');
    } else {
      setError('Invalid board configuration. Please check your entries.');
    }
  };

  // Render the Sudoku board
  return (
    <div className="sudoku-container">
      <h1 className="sudoku-title">Sudoku Solver</h1>
      <div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="sudoku-board">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={value}
              maxLength="1"
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              className="sudoku-cell"
            />
          ))
        )}
      </div>
      <div className="sudoku-buttons">
        <button onClick={handleValidate} className="sudoku-button">
          Validate
        </button>
        <button onClick={solveSudoku} className="sudoku-button">
          Solve
        </button>
      </div>
    </div>
  );
};

export default SudokuSolver;
