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
    player;
    constructor(position, player) {
        this.position = position;
        this.player = player;
    }
}

class Player {
    colour;
    ships;
    constructor(colour) {
        this.colour = colour;
        this.ships = [];
    }
    deployShip(playerShipBox) {
        this.ships.push(
            new Ship(playerShipBox.randomPoint(), this)
        );
    }
}

let players = [
    new Player("#ff0022"),
    new Player("#0066ff"),
    new Player(null),
    new Player(null)
]

class Game {
    level;
    players;
    constructor(numPlayers = 2) {
        this.level = new Level();
        this.players = Array.from(Array(numPlayers), (p, i) => p = players[i]);
    }

    deployShips() {
        players.forEach(p => p.ships = []);
        this.players.forEach((p, i) => {
            p.deployShip(GameView.getPlayerDeploymentBox(i));
        });
        GameView.drawShips(this);
    }

}