function drawFCI() {
    GameView.drawFCI(400, 400, 3, 0.8);
}

function mouseDownInGameView(mouseDownEvent) {
    let scaled = GameView.getScaledCoordinates(mouseDownEvent.clientX, mouseDownEvent.clientY);
    fci = new FireControlInterface(scaled.x, scaled.y);
    fci.trackingMouse = true;
    GameView.drawFCI(fci);
}

function mouseMoveInGameView(mouseMoveEvent) {
    if (fci != null && fci.trackingMouse) {
        let scaled = GameView.getScaledCoordinates(mouseMoveEvent.clientX, mouseMoveEvent.clientY);
        fci.trackPoint(scaled.x, scaled.y);
        GameView.drawFCI(fci);
    }
}

function mouseUpInGameView(mouseUpEvent) {
    if (fci != null && fci.trackingMouse) {
        fci.trackingMouse = false;
        let scaled = GameView.getScaledCoordinates(mouseUpEvent.clientX, mouseUpEvent.clientY);
        fci.trackPoint(scaled.x, scaled.y);
        GameView.drawFCI(fci);
    }
}

function mouseWheelInGameView(mouseWheelEvent) {
    if (fci != null) {
        fci.adjustVelocity(mouseWheelEvent.deltaY,mouseWheelEvent.shiftKey,mouseWheelEvent.ctrlKey);
        GameView.drawFCI(fci);
    }
}

let fci = null;

class FireControlInterface {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = Math.random() * 2 * Math.PI;
        this.v = Math.random();
        this.trackingMouse = false;
    }
    trackPoint(x, y) {
        this.a = Math.atan((this.y - y) / (x - this.x)) + (x >= this.x ? 0 : Math.PI);
    }
    adjustVelocity(delta, fast, slow){
        this.v = Math.max(0.001, Math.min(1, this.v + Math.sign(-delta) * 0.01 * (fast ? 10 : 1) * (slow ? 0.05 : 1)));
    }
}