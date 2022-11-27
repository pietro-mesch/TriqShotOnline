const GV_ASPECT = 9 / 5;
const GV_WIDTH = 1500;
const GV_HEIGHT = GV_WIDTH / GV_ASPECT;

const TOOLBAR_HEIGHT = 100;

function resizeComponents() {
    resizeGameView();
}

function resizeGameView() {
    const gv = document.getElementById('gameView');
    const ctx = gv.getContext('2d');
    dim = computeDimensions();
    ctx.canvas.width = dim.width;
    ctx.canvas.height = dim.height;
    ctx.scale(dim.scale, dim.scale);
    drawCurrentLevel();
}

function computeDimensions() {
    x_available = Math.min(window.innerWidth - 10, GV_WIDTH);
    y_available = Math.min(window.innerHeight - TOOLBAR_HEIGHT, GV_HEIGHT)
    x_ratio = x_available / GV_WIDTH;
    y_ratio = y_available / GV_HEIGHT;
    if (x_ratio <= y_ratio) {
        w = x_available;
        h = w / GV_ASPECT;
        s = x_ratio;
    } else {
        h = y_available;
        w = h * GV_ASPECT;
        s = y_ratio;
    }
    return new gameViewDimensions(w, h, s);
}

class gameViewDimensions {
    constructor(width, heigth, scale) {
        this.width = width;
        this.height = heigth;
        this.scale = scale;
    }
}