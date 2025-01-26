import { useState } from "react"
import GameGround from "./GameGround"


const KnowGridSize = () => {

    const [gridSize, setGridSize] = useState(null)

  return (
    <>
        {!gridSize ? 
            (
            <div className="grid-size">
                <h3>Choose a grid size: </h3>
                <button onClick={() => setGridSize(3)}>3x3</button>
                <button onClick={() => setGridSize(4)}>4x4</button>
                <button onClick={() => setGridSize(5)}>5x5</button>
            </div>
            )
            : 
            <GameGround gridSize={gridSize}/>
        }
    
    </>
    
  )
}

export default KnowGridSize