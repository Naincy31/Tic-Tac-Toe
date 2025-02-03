import './App.css';
import KnowGridSize from './components/KnowGridSize';
import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import mute from './assets/images/mute.png';
import volume from './assets/images/volume-up.png';
import { playClickSound } from './utils/playClickSound';

function App() {
  const [gridSize, setGridSize] = useState(null)
  const [soundVolume, setSoundVolume] = useState(true)

  const toggleSound = () => {
    setSoundVolume(!soundVolume)
  }

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
      <div className='sound-icon' onClick={toggleSound}>
        <img src={soundVolume ? volume : mute} alt='sound-toggle' />
      </div>
      {!gridSize ? (
        <KnowGridSize setGridSize={setGridSize} />
      ) : (
        <GameBoard gridSize={gridSize} setGridSize={setGridSize} soundVolume={soundVolume} />
      )}
    </>
  );
}

export default App;
