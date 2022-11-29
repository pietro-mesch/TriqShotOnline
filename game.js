let currentLevel = null;

function Phys() {
    return {G: 100}
}

function newGame() {
    generateLevel();
    GameView.drawLevel(currentLevel);
}

class Ship {
    position;
}

class Player {
    colour;
}

class Game {
    level;
    players;
}