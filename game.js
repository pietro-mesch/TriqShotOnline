let currentLevel = null;

function newGame() {
    generateLevel();
    GameView.drawLevel(currentLevel);
}