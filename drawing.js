CanvasRenderingContext2D.prototype.clearLayer =
    function () {
        this.clearRect(0, 0, GV_WIDTH, GV_HEIGHT);
    }

CanvasRenderingContext2D.prototype.drawCircle =
    function (x_centre, y_centre, radius) {
        this.beginPath();
        this.ellipse(x_centre, y_centre, radius, radius, 0, 0, 2 * Math.PI);
        this.stroke();
    }

const GV_ASPECT = 9 / 5;
const GV_WIDTH = 1500;
const GV_HEIGHT = GV_WIDTH / GV_ASPECT;

const LEVEL_LAYER_ID = "planetLayer";
const PLANET_COLOUR = "#32cd32";

const TRAJECTORY_LAYER_ID = "trajectoryLayer";
const TRAJECTORY_COLOUR = "#db1616";


class GameView {
    static htmlElement;
    static levelLayer;
    static trajectoryLayer;
    static controlsLayer;

    static layers;

    static {
        this.htmlElement = document.getElementById('gameView');
        this.levelLayer = document.getElementById(LEVEL_LAYER_ID).getContext('2d');
        this.trajectoryLayer = document.getElementById(TRAJECTORY_LAYER_ID).getContext('2d');
        this.controlsLayer = this.#createLayer();

        this.layers = [
            this.levelLayer,
            this.trajectoryLayer,
            this.controlsLayer
        ];
    };

    static #createLayer() {
        let canvas = document.createElement('canvas');
        canvas.className = "gameView-layer";
        canvas.id = "controlsLayer";
        this.htmlElement.appendChild(canvas);
        return canvas.getContext('2d');
    }

    static setDimensions(gameViewDimensions) {
        this.htmlElement.width = gameViewDimensions.width;
        this.htmlElement.height = gameViewDimensions.height;

        this.layers.forEach(l => {
            l.canvas.width = dim.width;
            l.canvas.height = dim.height;
            l.scale(dim.scale, dim.scale);
        });
        
        // this.levelLayer.canvas.width = dim.width;
        // this.levelLayer.canvas.height = dim.height;
        // this.levelLayer.scale(dim.scale, dim.scale);

        // this.trajectoryLayer.canvas.width = dim.width;
        // this.trajectoryLayer.canvas.height = dim.height;
        // this.trajectoryLayer.scale(dim.scale, dim.scale);
    }

    static drawPlanet(p) {
        this.levelLayer.strokeStyle = PLANET_COLOUR;
        this.levelLayer.lineWidth = PLANET_THICKNESS;
        this.levelLayer.drawCircle(p.x, p.y, p.radius);
    }

    static drawTrajectory(trajectory) {

        this.trajectoryLayer.lineWidth = TRAJECTORY_THICKNESS;
        this.trajectoryLayer.strokeStyle = TRAJECTORY_COLOUR;
        this.trajectoryLayer.lineCap = 'round';

        this.trajectoryLayer.beginPath();
        this.trajectoryLayer.moveTo(trajectory.x1, trajectory.y1);
        this.trajectoryLayer.lineTo(trajectory.x2, trajectory.y2);
        this.trajectoryLayer.stroke();
    }

    static drawLevel(planet) {
        this.levelLayer.clearLayer();
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