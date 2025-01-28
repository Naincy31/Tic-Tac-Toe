import './App.css';
import KnowGridSize from './components/KnowGridSize';
import { useState } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [gridSize, setGridSize] = useState(null)

  return (
    <>
      {!gridSize ? (
        <KnowGridSize setGridSize={setGridSize} />
      ) : (
        <GameBoard gridSize={gridSize} setGridSize={setGridSize} />
      )}
    </>
  );
}

export default App;
