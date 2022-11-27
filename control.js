function drawFCI() {
    GameView.drawFCI(400, 400, 3, 0.8);
}

function clickedInGameView(mouseDownEvent) {
    let rect = GameView.htmlElement.getBoundingClientRect();
    let x = (mouseDownEvent.clientX - rect.left) / GameView.dimensions.scale;
    let y = (mouseDownEvent.clientY - rect.top) / GameView.dimensions.scale;
    fci = new FireControlInterface(x,y);
    GameView.drawFCI(fci);
}

let fci = null;

class FireControlInterface {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.a = Math.random() * 2 * Math.PI;
        this.v = Math.random();
    }
}