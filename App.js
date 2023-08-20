import { Text, StyleSheet, TouchableOpacity, View, Unorderedlist } from 'react-native';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  square: {
    backgroundColor: '#E68CEC',
    height: verticalScale(70),
    width: scale(100),
    borderWidth: 1,
    borderColor: 'black',
    alignItems: "center",

  },
  tela: {
    marginTop: '10%',
  },
  grupo: {
    paddingLeft: "5%",
    paddingTop: "5%",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titulo: {
    color: "black",
    fontWeight: 'bold',
    textAlign: 'center'
  },
  history: {
    justifyContent: 'space-between',
    alignContent: "space-between",
    paddingVertical: "5%",
    paddingLeft: "5%",

  },
});

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Vá para o movimento #' + move;
    } else {
      description = 'Volte para o começo do jogo';
    }
    return (
      <TouchableOpacity onPress={() => jumpTo(move)}>
        <Text>{description}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View>
      <View>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} hist={history} />
      </View>
      <View>
        <View style={styles.history}>{moves}</View>
      </View>
    </View>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = ({ xIsNext, squares, onPlay, hist }) => {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X'
    }
    else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  let vitoria = 0;
  if (winner) {
    status = 'Vencedor: ' + winner
    vitoria += 1
  }
  else if (hist.length === 10) {
    status = 'Deu Velha! (Empate)'
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.titulo}>{status}</Text>
      <Text style={styles.titulo}>Ganhou {vitoria} vezes</Text>
      <View style={styles.grupo}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </View>
    </View>
  );
};
const Square = ({ value, onSquareClick }) => {
  return (
    <TouchableOpacity style={styles.square} onPress={onSquareClick}>
      <Text>{value}</Text>
    </TouchableOpacity>
  );
};
