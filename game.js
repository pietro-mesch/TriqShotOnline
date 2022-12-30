const SHIP_BOX_SIZE = { x: 0.2, y: 0.9 };
const PLANET_BOX_SIZE = { x: 0.7, y: 1 };
const NUM_PLAYERS = 2;
const SHIP_GAP = 100;

let currentGame = null;

function Phys() {
    return { G: 100 }
}

function initPage() {
    resizeComponents();
    newGame();
}

function newGame() {
    GameView.hideFCI();
    currentGame = new Game(
        NUM_PLAYERS,
        document.getElementById("shipSlider").value,
        document.getElementById("planetSlider").value
    );
    GameView.redraw();
    currentGame.deployShips();
    currentGame.switchPlayer();
    switchFireControl();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Ship {
    position;
    player;
    lastFiringVector;
    status;
    risk;
    radius;
    constructor(position, player) {
        this.position = position;
        this.player = player;
        this.lastFiringVector = null;
        this.status = 0;
        this.risk=0;
        this.radius = 5;
    }

    getLastShot(shots) {
        for (let i = shots.length - 1; i >= 0; i--) {
            if (shots[i] != null && shots[i].ship == this) {
                return shots[i];
            }
        }
        return null;
    }

    statusString() {
        switch (this.status) {
            case 0: return "OK";
            case 1: return "DESTROYED";
            default: break;
        }
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
        this.#selectedShip = this.ships.concat(this.ships).findIndex((ship, i) => {
            return i > this.#selectedShip && ship.status != 1
        }) % this.ships.length;
        // if (++this.#selectedShip >= this.ships.length) { this.#selectedShip = 0 };
        return this.ships[this.#selectedShip];
    }

    deployShip(position) {
        this.ships.push(
            new Ship(position, this)
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
    constructor(numPlayers, numShips, numPlanets) {
        this.numPlayers = numPlayers;
        this.numShips = numShips;
        this.level = new Level(numPlanets);
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

    getLastShots(count = OLD_SHOTS_LIMIT) {
        return new Array(count).concat(this.shots.slice(-count)).slice(-count);
    }

    getOkShips() {
        return this.getShips(ship => ship.status == 0);
    }

    getShips(condition = x => true) {
        let ships = [];
        this.#players.forEach(p => {
            p.ships.forEach(s => {
                if (condition(s)) {
                    ships.push(s);
                }
            })
        });
        return ships;
    }

    endTurn() {
        let standing = this.getStandingPlayers();
        if (standing.length > 1) {
            currentGame.switchPlayer();
            GameView.drawOldShotTrajectories(currentGame.getLastShots(OLD_SHOTS_LIMIT));
            switchFireControl();
        } else {
            this.endGame(standing);
        }
    }

    getStandingPlayers() {
        return this.#players.filter(player => player.ships.some(ship => ship.status != 1))
    }

    switchPlayer() {
        if (++this.#playerOrderIndex > this.numPlayers - 1) { this.#playerOrderIndex = 0 };
    }

    endGame(standing) {
        let winner = (standing.length == 1 ? standing[0] : this.shots.at(-1).ship.player);
        this.#playerOrderIndex = -1;
        clearFireControl();
        GameView.clearControlLayer();
        console.log(winner.name + " WINS!");
    }

    deployShips() {
        players.forEach(p => p.ships = []);
        for (let n = 0; n < this.numShips; n++) {
            this.#players.forEach((p, i) => {
                var position = GameView.getPlayerDeploymentBox(i).randomPoint();
                while (!Game.shipPositionOk(position, this.getShips(), this.level.planets)) {
                    position = GameView.getPlayerDeploymentBox(i).randomPoint();
                }
                p.deployShip(position);
            });
        }

        GameView.drawShips(this);
    }

    static shipPositionOk(position, ships, planets){
        return (
            !planets.some(p => dist(p.x, p.y, position.x, position.y) < p.radius) &&
            !ships.some(s => dist(s.position.x, s.position.y, position.x, position.y) < SHIP_GAP)
        )
    }

}