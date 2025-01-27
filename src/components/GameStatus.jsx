import { useMemo, useState } from "react"
import { generateWinPatterns } from "../utils/winPatterns"
import Grid from "./Grid"

const GameStatus = ({gridSize, setGridSize}) => {

    const winPatterns = useMemo(() => generateWinPatterns(gridSize), [gridSize])

    const [gameState, setGameState] = useState({
        playersStatus: {x: 0, o: 0},
        currentPlayer: 'X',
        squares: Array(gridSize * gridSize).fill(null),
        drawStatus: 0
    })

    const checkWinner = (currentSquares, player) => {
        return winPatterns.some(pattern => pattern.every(index => currentSquares[index] === player))
    }

    const gameStatus = useMemo(() => {
        const winner = checkWinner(gameState.squares, gameState.currentPlayer)
        if(winner) return `${gameState.currentPlayer} Wins!`
        if(gameState.squares.every(square => square)) return `It's a Draw`
        return `${gameState.currentPlayer} to move`
    }, [gameState.squares, gameState.currentPlayer])


    const handleRematch = () => {
        setGameState(prev => ({
            ...prev,
            currentPlayer: 'X',
            squares: Array(gridSize * gridSize).fill(null)
        }))
    }

  return (
    <div className='tic-tac-toe'>
        <h3>Status: {gameStatus && gameStatus}</h3>
        <div className="status-container">
            <div className="x-container">
                <h3>X</h3>
                <h3>{gameState.playersStatus.x} Wins</h3>
            </div>
            <div className="o-container">
                <h3>O</h3>
                <h3>{gameState.playersStatus.o} Wins</h3>
            </div>
            <div className="draw">
                <h3>=</h3>
                <h3>{gameState.drawStatus} Draws</h3>
            </div>
        </div>  
        <div className="game-container" style={{display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: `${gridSize * 100}px`}}>
            <Grid squares={gameState.squares} setGameState={setGameState} currentPlayer={gameState.currentPlayer} checkWinner={checkWinner} gameStatus={gameStatus}/>
        </div>
        <button className="rematch" onClick={handleRematch}>Rematch</button>
        <button className="change-grid" onClick={() => setGridSize(null)}>Want to change the grid?(Click Here!)</button>
    </div>
  )
}

export default GameStatus