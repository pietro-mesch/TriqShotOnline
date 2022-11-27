const GV_ASPECT = 9 / 5;
const GV_WIDTH = 1500;
const GV_HEIGHT = GV_WIDTH / GV_ASPECT;

const PLANET_LAYER_ID = "planetLayer";
const PLANET_COLOUR = "#32cd32";

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
    drawCircle(x_centre, y_centre, radius) {
        this.context2d.beginPath();
        this.context2d.ellipse(x_centre, y_centre, radius, radius, 0, 0, 2 * Math.PI);
        this.context2d.stroke();
    }
    drawPlanet(p){
        this.context2d.strokeStyle = this.colour;
        this.context2d.lineWidth = PLANET_THICKNESS;
        this.drawCircle(p.x, p.y, p.radius);
    }

    drawTrajectory(t){
        this.context2d.strokeStyle = this.colour;
        this.context2d.lineWidth = TRAJECTORY_THICKNESS;
        this.context2d.lineCap = 'round';
        this.context2d.beginPath();
        this.context2d.moveTo(t.x1, t.y1);
        this.context2d.lineTo(t.x2, t.y2);
        this.context2d.stroke();
    }
}


class GameView {
    static htmlElement;
    static planetLayer;
    static trajectoryLayer;
    static controlLayer;

    static layers;

    static {
        this.htmlElement = document.getElementById('gameView');
        this.planetLayer = this.#createLayer(PLANET_LAYER_ID, PLANET_COLOUR);
        this.trajectoryLayer = this.#createLayer(TRAJECTORY_LAYER_ID, TRAJECTORY_COLOUR);
        this.controlLayer = this.#createLayer(CONTROL_LAYER_ID, CONTROL_COLOUR);

        this.layers = [
            this.planetLayer,
            this.trajectoryLayer,
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

    static setDimensions(gameViewDimensions) {
        this.htmlElement.width = gameViewDimensions.width;
        this.htmlElement.height = gameViewDimensions.height;
        this.layers.forEach(l => l.setDimensions(gameViewDimensions));
    }

    static drawPlanet(p) {this.planetLayer.drawPlanet(p);}

    static drawTrajectory(trajectory) {this.trajectoryLayer.drawTrajectory(trajectory);}

    static drawLevel(planet) {
        this.planetLayer.clear();
        this.drawPlanet(planet);
    }
}

class GameViewDimensions {
    constructor(width, heigth, scale) {
        this.width = width;
        this.height = heigth;
        this.scale = scale;
    }
}