import mute from '../assets/images/mute.png';
import volume from '../assets/images/volume-up.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSound } from '../redux/gameSlice';

const GameSound = () => {
    const soundVolume = useSelector(state => state.game.soundVolume)
    const dispatch = useDispatch()

  return (
    <div className='sound-icon' onClick={() => dispatch(toggleSound())}>
        <img src={soundVolume ? volume : mute} alt='sound-toggle' />
    </div>
  )
}

export default GameSound