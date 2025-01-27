
const GridPreview = ({size}) => {
    const squares = Array(size * size).fill(null)

  return (
    <div className="grid-preview" style={{gridTemplateColumns: `repeat(${size}, 1fr)`, width: `${size * 35}px`}}>
        {squares.map((_, index) => (
            <div 
                key={index}
                className="preview-square"
            />
        ))}
    </div>
  )
}

export default GridPreview