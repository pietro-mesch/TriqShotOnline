function drawFCI() {
    GameView.drawFCI(400, 400, 3, 0.8);
}

function clickedInGameView(mouseDownEvent) {
    let rect = GameView.htmlElement.getBoundingClientRect();
    let x = (mouseDownEvent.clientX - rect.left) / GameView.dimensions.scale;
    let y = (mouseDownEvent.clientY - rect.top) / GameView.dimensions.scale;
    GameView.drawFCI(x, y, Math.random() * 2 * Math.PI, Math.random());
}