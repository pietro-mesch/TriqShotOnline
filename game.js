SHIP_BOX_SIZE = { x: 0.2, y: 0.9 };
PLANET_BOX_SIZE = { x: 0.7, y: 1 };

let currentGame = null;

function Phys() {
    return { G: 100 }
}

function newGame() {
    currentGame = new Game();
    GameView.drawLevel(currentGame.level);
    currentGame.deployShips();
}

class Ship {
    position;
    colour;
    constructor(position, colour) {
        this.position = position;
        this.colour = colour;
    }
}

class Player {
    colour;
    ships;
    constructor(colour) {
        this.colour = colour;
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
        for (let i = 0; i < this.players.length; i++) {
            this.playerDeployShip(i);
        }
        GameView.drawShips(this);
    }
    playerDeployShip(playerIndex) {
        let position = GameView.getPlayerDeploymentBox(playerIndex).randomPoint();
        this.players[playerIndex].ships.push(new Ship(
            position, this.players[playerIndex].colour
        ));
    }
}