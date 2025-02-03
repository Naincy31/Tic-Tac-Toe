import { useEffect, useMemo, useState } from "react"
import { generateWinPatterns } from "../utils/winPatterns"
import Grid from "./Grid"

const GameBoard = ({gridSize, setGridSize, soundVolume}) => {
    const winPatterns = useMemo(() => generateWinPatterns(gridSize), [gridSize])

    const [gameState, setGameState] = useState({
        playerScores: {x: 0, o: 0},
        currentPlayer: 'X',
        squares: Array(gridSize * gridSize).fill(null),
        draws: 0
    })

    const [gameStarted, setGameStarted] = useState(false)
    const [rematchVisible, setRematchVisible] = useState(false)

    const checkWinner = (currentSquares, player) => {
        return winPatterns.some(pattern => pattern.every(index => currentSquares[index] === player))
    }

    const gameStatus = useMemo(() => {
        const winner = checkWinner(gameState.squares, gameState.currentPlayer)
        if(winner) return `${gameState.currentPlayer} Wins! 🎉`
        if(gameState.squares.every(square => square)) return `It's a Draw! 🤝`
        return `${gameState.currentPlayer}'s Turn`
    }, [gameState.squares, gameState.currentPlayer])

    const handleStartOver = () => {
        setGameState(() => ({
            playerScores: {x: 0, o: 0},
            currentPlayer: 'X',
            squares: Array(gridSize * gridSize).fill(null),
            draws: 0
        }))
        setGameStarted(false)
        setRematchVisible(false)
    }

    const handleRematch = () => {
        setGameState(prev => ({
            ...prev,
            currentPlayer: 'X',
            squares: Array(gridSize * gridSize).fill(null)
        }))
        setRematchVisible(false)
    }

    const handleCloseRematch = () => {
        setRematchVisible(false)
    }

    useEffect(() => {
        if(gameState.squares.some(square => square)){
            setGameStarted(true)
        }
    }, [gameState.squares])

  return (
    <div className="game-board">
      <h3 className="game-status flash-text">{gameStatus}</h3>
      <div className="scoreboard">
        <div className="score X">
          <h3>Player X</h3>
          <h4>{gameState.playerScores.x} Wins</h4>
        </div>
        <div className="score O">
          <h3>Player O</h3>
          <h4>{gameState.playerScores.o} Wins</h4>
        </div>
        <div className="score draw">
          <h3>Draws</h3>
          <h4>{gameState.draws}</h4>
        </div>
      </div>
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `${gridSize * 100}px`,
        }}
      >
        <Grid
          squares={gameState.squares}
          currentPlayer={gameState.currentPlayer}
          checkWinner={checkWinner}
          setGameState={setGameState}
          gameStatus={gameStatus}
          setRematchVisible={setRematchVisible}
          soundVolume = {soundVolume}
        />
      </div>
      <div className="controls">
        <button
          className={`start-over ${gameStarted ? "enabled" : "disabled"}`}
          onClick={handleStartOver}
          disabled={!gameStarted}
        >
          Start Over
        </button>
        <button className="change-grid" onClick={() => setGridSize(null)}>
          Change Grid Size
        </button>
      </div>
      {rematchVisible && (
        <div className="rematch-overlay">
            <div className="rematch-popup">
              <button className="close-icon" onClick={handleCloseRematch}>
                  X
              </button>
              <h2>Rematch?</h2>
              <div className="rematch-controls">
                  <button className="rematch-button" onClick={handleRematch}>
                  Play Again
                  </button>
              </div>
            </div>
        </div>
        )}

    </div>
  )
}

export default GameBoard

//sound mute
//rematch cross then user won't be able to rematch again restart