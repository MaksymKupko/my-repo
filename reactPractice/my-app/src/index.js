import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    let divs = [];
    for (let i = 0; i < 3; i++) {
      const div = [];
      for (let j = i * 3; j < (i + 1) * 3; j++) {
        div.push(this.renderSquare(j));
      }
      divs.push(div) 
    }
  const result = divs.map((item, index) => <div key={index} className="board-row">{item}</div>)
    return (
      <div>
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
        {result}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      squareSelected: null,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i]) {
      this.setState({
        squareSelected: i,
      });
      return;
    }

    if (calculateWinner(squares)) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          i,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const indexOfClickedAgain = this.state.squareSelected;

    const moves = history.map((step, move) => {
      const clickedSquare = step.i;
      const row = Math.floor(clickedSquare / 3) + 1;
      const col = ((clickedSquare + 3) % 3) + 1;

      const desc = move ? "Go to move " + move + "(row: " + row + " col: " + col + ")" : "Go to game start";
      return (
        <li key={move}>
          <button
            className="history-btn"
            onClick={() => this.jumpTo(move)}
            style={indexOfClickedAgain === clickedSquare ? { fontWeight: 700 } : {}}
          >
            {desc}
          </button>
        </li>
      );
    });
    let status;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
