const GV_ASPECT = 9 / 5;
const GV_WIDTH = 1500;
const GV_HEIGHT = GV_WIDTH / GV_ASPECT;

FCI_SETTINGS = {
    radius: 100
}

const PLANET_LAYER_ID = "planetLayer";
const PLANET_COLOUR = "#32cd32";

const SHIP_LAYER_ID = "shipLayer";

const TRAJECTORY_LAYER_ID = "trajectoryLayer";
const TRAJECTORY_COLOUR = "#db1616";

const CONTROL_LAYER_ID = "controlLayer";
const CONTROL_COLOUR = "#097ce8";

class gameViewLayer {
    constructor(id, colour, context2d) {
        this.id = id;
        this.colour = colour;
        this.context2d = context2d;
    }

    setDimensions(gameViewDimensions) {
        this.context2d.canvas.width = gameViewDimensions.width;
        this.context2d.canvas.height = gameViewDimensions.height;
        this.context2d.scale(gameViewDimensions.scale, gameViewDimensions.scale);
    }

    clear() { this.context2d.clearRect(0, 0, GV_WIDTH, GV_HEIGHT) };
    drawFrame() {
        this.context2d.strokeStyle = this.colour;
        this.context2d.lineWidth = PLANET_THICKNESS;
        this.context2d.strokeRect(0, 0, GV_WIDTH, GV_HEIGHT);
    }
    drawCircle(x_centre, y_centre, radius) {
        this.context2d.beginPath();
        this.context2d.ellipse(x_centre, y_centre, radius, radius, 0, 0, 2 * Math.PI);
        this.context2d.stroke();
    }
    drawPlanet(p) {
        this.context2d.strokeStyle = this.colour;
        this.context2d.lineWidth = PLANET_THICKNESS;
        this.drawCircle(p.x, p.y, p.radius);
    }

    drawTrajectory(t) {
        this.context2d.strokeStyle = this.colour;
        this.context2d.lineWidth = TRAJECTORY_THICKNESS;
        this.context2d.lineCap = 'round';
        this.context2d.beginPath();
        this.context2d.moveTo(t.points[0].x, t.points[0].y);
        for (let i = 1; i < t.points.length; i++) {
            this.context2d.lineTo(t.points[i].x, t.points[i].y);
        }
        this.context2d.stroke();
    }

    drawShip(ship) {
        let r = 5;
        let x = ship.position.x;
        let y = ship.position.y;

        this.context2d.fillStyle = ship.colour;
        this.context2d.beginPath();
        this.context2d.moveTo(x, y - 2 * r);
        this.context2d.lineTo(x + r * Math.sqrt(3), y + r);
        this.context2d.lineTo(x - r * Math.sqrt(3), y + r);
        this.context2d.fill();
    }

    drawFCI(fci) {
        this.drawBaseFCI(fci.x, fci.y, fci.a, fci.v)
    }

    drawBaseFCI(x, y, a, v) {
        let r = FCI_SETTINGS.radius;
        let rinf = 2 * GV_WIDTH;
        let rv = r * v;
        let rs = r * 0.1;
        let p = Math.PI;
        let as = p / 4;
        let aa = p - as;
        let cos = Math.cos(a);
        let sin = Math.sin(a);

        this.context2d.strokeStyle = this.colour;
        this.context2d.lineCap = "round";

        this.context2d.lineWidth = 2;
        this.context2d.setLineDash([]);
        this.context2d.beginPath();
        this.context2d.moveTo(x, y);
        this.context2d.lineTo(x + rv * cos, y - rv * sin);
        this.context2d.stroke();
        this.context2d.beginPath();
        this.context2d.moveTo(x + rv * cos, y - rv * sin);
        this.context2d.lineTo(x + rv * cos + rs * Math.cos(a - aa), y - rv * sin - rs * Math.sin(a - aa));
        this.context2d.stroke();
        this.context2d.beginPath();
        this.context2d.moveTo(x + rv * cos, y - rv * sin);
        this.context2d.lineTo(x + rv * cos + rs * Math.cos(a + aa), y - rv * sin - rs * Math.sin(a + aa));
        this.context2d.stroke();

        this.context2d.lineWidth = 1;
        this.drawCircle(x, y, rv);
        this.drawCircle(x, y, r);
        this.context2d.setLineDash([3, 7]);
        this.context2d.beginPath();
        this.context2d.moveTo(x, y);
        this.context2d.lineTo(x + rinf * cos, y - rinf * sin);
        this.context2d.stroke();

        this.context2d.setLineDash([15, 15]);
        this.drawCircle(x, y, r / 2);
        this.context2d.setLineDash([5, 10]);
        this.drawCircle(x, y, r * 3 / 4);
        this.drawCircle(x, y, r / 4);

        this.context2d.setLineDash([5, 5]);
        this.context2d.beginPath();
        this.context2d.moveTo(x - r, y);
        this.context2d.lineTo(x + r, y);
        this.context2d.stroke();
        this.context2d.beginPath();
        this.context2d.moveTo(x, y - r);
        this.context2d.lineTo(x, y + r);
        this.context2d.stroke();
    }
}


class GameView {
    static htmlElement;
    static planetLayer;
    static trajectoryLayer;
    static shipLayer;
    static controlLayer;

    static dimensions;

    static layers;

    static {
        this.htmlElement = document.getElementById('gameView');
        this.htmlElement.addEventListener("mousedown", function (e) { mouseDownInGameView(e); });
        this.htmlElement.addEventListener("mousemove", function (e) { mouseMoveInGameView(e); });
        this.htmlElement.addEventListener("mouseup", function (e) { mouseUpInGameView(e); });
        this.htmlElement.addEventListener("mouseleave", function (e) { mouseLeftGameView(e); });
        this.htmlElement.addEventListener("wheel", function (e) {
            e.preventDefault();
            e.stopPropagation();
            mouseWheelInGameView(e);
        }, { passive: false });

        this.planetLayer = this.#createLayer(PLANET_LAYER_ID, PLANET_COLOUR);
        this.trajectoryLayer = this.#createLayer(TRAJECTORY_LAYER_ID, TRAJECTORY_COLOUR);
        this.shipLayer = this.#createLayer(SHIP_LAYER_ID, null);
        this.controlLayer = this.#createLayer(CONTROL_LAYER_ID, CONTROL_COLOUR);

        this.layers = [
            this.planetLayer,
            this.trajectoryLayer,
            this.shipLayer,
            this.controlLayer
        ];
    };

    static #createLayer(id, colour) {
        let canvas = document.createElement('canvas');
        canvas.className = "gameView-layer";
        canvas.id = id;
        this.htmlElement.appendChild(canvas);

        return new gameViewLayer(id, colour, canvas.getContext('2d'));
    }

    static resize() {
        this.setDimensions(computeDimensions());
        this.redraw();
    }

    static redraw() {
        if (currentGame != null) {
            this.drawLevel(currentGame.level);
            this.drawTrajectory(lastTrajectory);
            this.drawShips(currentGame);
            this.drawFCI(fci);
        }
    }

    static getPlayerDeploymentBox(playerIndex) {
        let x = SHIP_BOX_SIZE.x;
        let y = SHIP_BOX_SIZE.y;
        switch (playerIndex) {
            case 0:
                return new Box(
                    0,
                    GV_HEIGHT * (1 - y) / 2,
                    GV_WIDTH * x,
                    GV_HEIGHT * (1 + y) / 2
                );

            case 1:
                return new Box(
                    GV_WIDTH * (1 - x),
                    GV_HEIGHT * (1 - y) / 2,
                    GV_WIDTH,
                    GV_HEIGHT * (1 + y) / 2
                );

            default:
                break;
        }
    }

    static getPlanetBox() {
        return new Box(
            GV_WIDTH * (1 - PLANET_BOX_SIZE.x) / 2,
            GV_HEIGHT * (1 - PLANET_BOX_SIZE.y) / 2,
            GV_WIDTH * (1 + PLANET_BOX_SIZE.x) / 2,
            GV_HEIGHT * (1 + PLANET_BOX_SIZE.y) / 2
        );
    }

    static getRandomCoordinates() {
        return {
            x: Math.floor(Math.random() * (GV_WIDTH + 1)),
            y: Math.floor(Math.random() * (GV_HEIGHT + 1))
        };
    }

    static getScaledCoordinates(window_x, window_y) {
        let rect = this.htmlElement.getBoundingClientRect();
        let x = (window_x - rect.left) / GameView.dimensions.scale;
        let y = (window_y - rect.top) / GameView.dimensions.scale;
        return { x: x, y: y };
    }

    static setDimensions(gameViewDimensions) {
        this.dimensions = gameViewDimensions;
        this.htmlElement.width = gameViewDimensions.width;
        this.htmlElement.height = gameViewDimensions.height;
        this.layers.forEach(l => l.setDimensions(gameViewDimensions));
    }

    static drawPlanet(p) { this.planetLayer.drawPlanet(p); }

    static drawTrajectory(trajectory) {
        if (trajectory != null) {
            this.trajectoryLayer.clear();
            this.trajectoryLayer.drawTrajectory(trajectory);
        }
    }

    static drawLevel(level) {
        this.planetLayer.clear();
        this.planetLayer.drawFrame();
        this.drawPlanet(level.planets[0]);
    }

    static drawShips(game) {
        this.shipLayer.clear();
        game.players.forEach(player => {
            player.ships.forEach(ship => {
                this.shipLayer.drawShip(ship);
            });
        });
    }

    static drawFCI(fci) {
        if (fci != null) {
            this.controlLayer.clear();
            this.controlLayer.drawFCI(fci);
        }
    }
}

class GameViewDimensions {
    constructor(width, heigth, scale) {
        this.width = width;
        this.height = heigth;
        this.scale = scale;
    }
}