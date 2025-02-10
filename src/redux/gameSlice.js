import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    soundVolume: true,
    gridSize: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        toggleSound(state) {
            state.soundVolume = !state.soundVolume;
        },
        setGridSize(state, action) {
            state.gridSize = action.payload;
        }
    }
});

export const { toggleSound, setGridSize } = gameSlice.actions;
export default gameSlice.reducer;