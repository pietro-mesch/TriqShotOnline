function drawFCI() {
    GameView.drawFCI(400, 400, 3, 0.8);
}

function clickedInGameView(mouseDownEvent) {
    let scaled = GameView.getScaledCoordinates(mouseDownEvent.clientX, mouseDownEvent.clientY);
    fci = new FireControlInterface(scaled.x, scaled.y);
    GameView.drawFCI(fci);
}

let fci = null;

class FireControlInterface {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = Math.random() * 2 * Math.PI;
        this.v = Math.random();
    }
}