export const playClickSound = (soundVolume) => {
    if (!soundVolume) return;

    const clickSound = new Audio('/assets/sounds/game-click.mp3')
    clickSound.currentTime = 0
    clickSound.play().catch(error => console.error("Error playing sound:", error))
}