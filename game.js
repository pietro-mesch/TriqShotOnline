let currentLevel = null;

function Phys() {
    return {G: 100}
}

function newGame() {
    generateLevel();
    GameView.drawLevel(currentLevel);
}