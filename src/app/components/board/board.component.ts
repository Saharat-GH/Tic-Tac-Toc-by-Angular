import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: 
  './board.component.html'
  ,
  styleUrl: './board.component.css'
})
export class BoardComponent {
  // btns: Board = new Board();

  btns: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  // declare a variable.
  winner: string | null = null;
  currentPlayer: 'X' | 'O' = 'X';

  // event handling function.
  checkWinner(): boolean {
    const lines: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (this.btns[Math.floor(a / 3)][a % 3] &&
          this.btns[Math.floor(a / 3)][a % 3] === this.btns[Math.floor(b / 3)][b % 3] &&
          this.btns[Math.floor(a / 3)][a % 3] === this.btns[Math.floor(c / 3)][c % 3]) {
        return true;
      }
    }
    return false;
  }

  isTie(): boolean {
    let filledCount: number = 0;
    for (let i = 0; i < this.btns.length; i++) { 
      for (let j = 0; j < this.btns[i].length; j++) {
        if (this.btns[i][j] === '') {
          continue;
        } else {
          filledCount += 1;
        }
      }
    }
    if (filledCount === 9) {
      return true;
    }
    return false;
  }
  
  makeMove(row: number, col: number): void {
    const buttonValue: any = this.btns[row][col];
    if (!buttonValue && this.winner === null) {
      this.btns[row][col] = this.currentPlayer;

    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
    } else {
      if (this.isTie()) {
        this.winner = "Tie";
      }
      // swich the player
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    }
  }

  restart(): void {
    for (let i = 0; i < this.btns.length; i++) {
      for (let j = 0; j < this.btns[i].length; j++) {
        this.btns[i][j] = '';
      }
    }
    this.winner = null;
  }
}
  // class Board {
  //   private board: string[][];
  //   constructor() {
  //     this.board = [
  //       ['', '', ''],
  //       ['', '', ''],
  //       ['', '', '']
  //     ];        
  //   }

  //   getValue(row: number, col: number): string {
  //     return this.board[row][col];
  //   } 
  //   setValue(row: number, col: number, value: 'X' | 'O' | ''): void {
  //     this.board[row][col] = value;
  //   }

  //   reset(): void {
  //     for (let i = 0; i < this.board.length; i++) {
  //       for (let j = 0; j < this.board[i].length; j++) {
  //         this.board[i][j] = '';
  //       }
  //     }
  //   }
  // }

