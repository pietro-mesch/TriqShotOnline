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
    currentGame.switchPlayer();
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
    name;
    colour;
    ships;
    constructor(name, colour) {
        this.name = name;
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
    new Player("PLAYER 0", "#ff0022"),
    new Player("PLAYER 1", "#0066ff"),
    new Player("PLAYER 2", null),
    new Player("PLAYER 3", null)
]

class Game {
    level;
    numPlayers;
    #players;
    #playerOrderIndex;
    constructor(numPlayers = 2) {
        this.numPlayers = numPlayers;
        this.level = new Level();
        this.#players = this.getActivePlayerArray(numPlayers);
        this.#playerOrderIndex = -1;
    }

    activePlayer() {
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

    switchPlayer() {
        this.#playerOrderIndex++;
        if (this.#playerOrderIndex = this.numPlayers) { this.#playerOrderIndex = 0 };
    }

    deployShips() {
        players.forEach(p => p.ships = []);
        this.#players.forEach((p, i) => {
            p.deployShip(GameView.getPlayerDeploymentBox(i));
        });
        GameView.drawShips(this);
    }

}