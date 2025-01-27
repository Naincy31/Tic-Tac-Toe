import './App.css';
import KnowGridSize from './components/KnowGridSize';
import GameStatus from './components/GameStatus';
import { useState } from 'react';

function App() {
  const [gridSize, setGridSize] = useState(null)

  return (
    <>
      {!gridSize ? (
        <KnowGridSize setGridSize={setGridSize} />
      ) : (
        <GameStatus gridSize={gridSize} setGridSize={setGridSize} />
      )}
    </>
  );
}

export default App;
