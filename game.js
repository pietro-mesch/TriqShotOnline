const SHIP_BOX_SIZE = { x: 0.2, y: 0.9 };
const PLANET_BOX_SIZE = { x: 0.7, y: 1 };

let currentGame = null;

function Phys() {
    return { G: 100 }
}

function newGame() {
    currentGame = new Game(2, 2);
    GameView.drawLevel(currentGame.level);
    currentGame.deployShips();
    currentGame.switchPlayer();
}

class Ship {
    position;
    player;
    lastFiringVector;
    constructor(position, player) {
        this.position = position;
        this.player = player;
        this.lastFiringVector = null;
    }
}

class Player {
    name;
    colour;
    ships;
    #selectedShip;
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
        this.ships = [];
        this.#selectedShip = -1;
    }

    getSelectedShip() {
        return this.ships[this.#selectedShip];
    }

    selectNextShip() {
        if (++this.#selectedShip >= this.ships.length) { this.#selectedShip = 0 };
        return this.ships[this.#selectedShip];
    }

    deployShip(playerShipBox) {
        this.ships.push(
            new Ship(playerShipBox.randomPoint(), this)
        );
    }
}

let players = [
    new Player("PLAYER 0", "#ff0022"),
    new Player("PLAYER 1", "#0066ff"),
    new Player("PLAYER 2", null),
    new Player("PLAYER 3", null)
]

class Game {
    level;
    numPlayers;
    numShips;
    shots;
    #players;
    #playerOrderIndex;
    constructor(numPlayers, numShips) {
        this.numPlayers = numPlayers;
        this.numShips = numShips;
        this.level = new Level();
        this.shots = [];
        this.#players = this.getActivePlayerArray(numPlayers);
        this.#playerOrderIndex = -1;
    }

    getActivePlayer() {
        return this.#players[this.#playerOrderIndex];
    }

    getActivePlayerArray(numPlayers) {
        let indices = Array(numPlayers).fill(-1);
        for (let i = 0; i < numPlayers; i++) {
            let x = randInt(0, numPlayers - 1);
            while (indices.includes(x)) { x = randInt(0, numPlayers - 1) };
            indices[i] = x;
        };
        return Array.from(Array(numPlayers), (p, i) => p = players[indices[i]]);
    }

    getLastShots(count) {
        return new Array(count).concat(this.shots.slice(-count)).slice(-count);
    }

    switchPlayer() {
        if (++this.#playerOrderIndex > this.numPlayers - 1) { this.#playerOrderIndex = 0 };
    }

    deployShips() {
        players.forEach(p => p.ships = []);
        for (let n = 0; n < this.numShips; n++) {
            this.#players.forEach((p, i) => {
                p.deployShip(GameView.getPlayerDeploymentBox(i));
            });
        }

        GameView.drawShips(this);
    }

}