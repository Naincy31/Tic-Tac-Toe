import oTone from "../assets/sounds/oTone.mp3"
import xTone from "../assets/sounds/xTone.mp3"
import winTone from "../assets/sounds/win.mp3"

const Grid = ({squares, currentPlayer, checkWinner, setGameState, gameStatus}) => {
  
    const handleClick = (index) => {
        if(squares[index] || !gameStatus.includes('to move')) return;

        const updatedSquares = [...squares]
        updatedSquares[index] = currentPlayer

        const sound = currentPlayer === 'X' ? new Audio(xTone) : new Audio(oTone)
        sound.play()

        const winner = checkWinner(updatedSquares, currentPlayer)   
        
        if(winner){
            const winSound = new Audio(winTone)
            winSound.play()

            setTimeout(() => {
                winSound.pause()
                winSound.currentTime = 0
            }, 1500)

            setGameState(prev => ({
                ...prev,
                squares: updatedSquares,
                playersStatus: {...prev.playersStatus, [currentPlayer.toLowerCase()]: prev.playersStatus[currentPlayer.toLowerCase()] + 1}
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
                currentPlayer: currentPlayer === 'X' ? 'O': 'X',
                squares: updatedSquares
            }))
        }
    }
  
  return (
    <>
        {squares.map((square, index) => 
        (
            <div 
                className="square" 
                key={index} 
                onClick={() => handleClick(index)}
            >
                {square}
            </div>
        ))}
    </>
  )
}

export default Grid