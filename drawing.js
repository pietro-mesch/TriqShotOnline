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

class GameView {
    static htmlElement;
    static {
        this.htmlElement = document.getElementById('gameView');
    };

    static setDimensions(gameViewDimensions) {
        this.htmlElement.width = gameViewDimensions.width;
        this.htmlElement.height = gameViewDimensions.height;
    }
}

class GameViewDimensions {
    constructor(width, heigth, scale) {
        this.width = width;
        this.height = heigth;
        this.scale = scale;
    }
}