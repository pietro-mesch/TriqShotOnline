const TOOLBAR_HEIGHT = 65;

function resizeComponents() {
    resizeGameView();
}

function resizeGameView() {
    GameView.resize();
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
    return new GameViewDimensions(w, h, s);
}