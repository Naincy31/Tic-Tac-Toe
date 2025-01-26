import { useEffect, useMemo, useState } from "react"

const GameGround = ({gridSize}) => {

    const winPatterns = useMemo(() => {
        const patterns = []

        //row patterns
        for(let i = 0; i < gridSize; i++){
            patterns.push(Array.from({length: gridSize}, (_, j) => (gridSize * i + j)))
        }

        //column patterns
        for(let i = 0; i < gridSize; i++){
            patterns.push(Array.from({length: gridSize}, (_, j) => (gridSize * j + i)))
        }

        //diagonal from l to r
        patterns.push(Array.from({length: gridSize}, (_, j) => ((gridSize + 1) * j)))

        //diagonal from r to l
        patterns.push(Array.from({length: gridSize}, (_, j) => ((gridSize - 1) * (j + 1))))

        return patterns

    }, [gridSize])

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
        const winner = checkWinner(gameState.squares)
        if(winner) return `${gameState.currentPlayer} Wins!`
        if(gameState.squares.every(square => square)) return `It's a Draw`
        return `${gameState.currentPlayer} to move`
    }, [gameState.squares, gameState.currentPlayer])

    const handleClick = (index) => {
        if(gameState.squares[index] || !gameStatus.includes('to move')) return;

        const updatedSquares = [...gameState.squares]
        updatedSquares[index] = gameState.currentPlayer
        console.log(updatedSquares)

        const winner = checkWinner(updatedSquares, gameState.currentPlayer)   
        
        if(winner){
            setGameState(prev => ({
                ...prev,
                squares: updatedSquares,
                playersStatus: {...prev.playersStatus, [gameState.currentPlayer.toLowerCase()]: prev.playersStatus[gameState.currentPlayer.toLowerCase()] + 1}
            }))
        } else if (updatedSquares.every(square => square)){
            setGameState(prev => ({
                ...prev,
                squares: updatedSquares,
                drawStatus: prev.drawStatus + 1
            }))
        } else {
            setGameState(prev => ({
                ...prev,
                currentPlayer: gameState.currentPlayer === 'X' ? '0': 'X',
                squares: updatedSquares
            }))
        }
    }

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
            {gameState.squares.map((square, index) => 
            (
                <div 
                    className="square" 
                    key={index} 
                    onClick={() => handleClick(index)}
                >
                    {square}
                </div>
            ))}
        </div>
        <button className="rematch" onClick={handleRematch}>Rematch</button>
    </div>
  )
}

export default GameGround