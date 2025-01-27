export const generateWinPatterns = (gridSize) => {
    const patterns = [];

    // Row patterns
    for (let i = 0; i < gridSize; i++) {
        patterns.push(Array.from({ length: gridSize }, (_, j) => gridSize * i + j));
    }

    // Column patterns
    for (let i = 0; i < gridSize; i++) {
        patterns.push(Array.from({ length: gridSize }, (_, j) => gridSize * j + i));
    }

    // Diagonal from left to right
    patterns.push(Array.from({ length: gridSize }, (_, j) => (gridSize + 1) * j));

    // Diagonal from right to left
    patterns.push(Array.from({ length: gridSize }, (_, j) => (gridSize - 1) * (j + 1)));

    return patterns;
};
