import GridPreview from "./GridPreview"
import { useDispatch } from "react-redux"
import { setGridSize } from "../redux/gameSlice"

const KnowGridSize = () => {
    const dispatch = useDispatch()
    const gridSizesArray = [3, 4, 5]

  return (
    <div className="grid-size-container">
      <h3>Choose a grid: </h3>
      <div className="grid-options">
        {gridSizesArray.map((size, index) => (
          <div className="grid-preview-container" key={index} onClick={() => dispatch(setGridSize(size))}>
            <button>{`${size}x${size}`}</button>
            <GridPreview size={size}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KnowGridSize