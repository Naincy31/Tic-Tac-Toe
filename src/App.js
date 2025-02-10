import './App.css';
import KnowGridSize from './components/KnowGridSize';
import { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { playClickSound } from './utils/playClickSound';
import GameSound from './components/GameSound';
import { useSelector } from 'react-redux';

function App() {
  const gridSize = useSelector(state => state.game.gridSize)
  const soundVolume = useSelector(state => state.game.soundVolume)

  useEffect(() => {
    console.log(gridSize)
  }, [gridSize])

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === 'BUTTON') {
        playClickSound(soundVolume)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [soundVolume])

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
