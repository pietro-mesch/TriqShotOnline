PLAYER_DEPLOYMENT_AREA = { x: 0.2, y: 0.9 };

let currentLevel = null;

function Phys() {
    return { G: 100 }
}

function newGame() {
    generateLevel();
    GameView.drawLevel(currentLevel);
}

class Ship {
    position;
    constructor(position) {
        this.position = position;
    }
}

class Player {
    colour;
    ships;
    constructor(colour) {
        this.colour = this.colour;
        this.ships = [];
    }
}

class Game {
    level;
    players;
    constructor() {
        this.level = new Level();
        this.players = [
            new Player("#ff0022"),
            new Player("#0066ff")
        ]
    }

    deployShips() {
        for (let i = 0; i < this.players.length; index++) {
            this.playerDeployShip(i);
        }
    }
    playerDeployShip(playerIndex) {
        position = GameView.getPlayerDeploymentBox(playerIndex).randomPoint();
        playerIndex.ships.push(new Ship(position));
    }
}