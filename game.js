let currentLevel = null;

function Phys() {
    return {G: 1000}
}

function newGame() {
    generateLevel();
    GameView.drawLevel(currentLevel);
}