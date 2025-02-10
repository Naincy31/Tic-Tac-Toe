import './App.css';
import KnowGridSize from './components/KnowGridSize';
import GameBoard from './components/GameBoard';
import GameSound from './components/GameSound';
import { useSelector } from 'react-redux';

function App() {
  const gridSize = useSelector(state => state.game.gridSize)

  return (
    <>
      <GameSound />
      {!gridSize ? (
        <KnowGridSize />
      ) : (
        <GameBoard gridSize={gridSize} />
      )}
    </>
  );
}

export default App;
