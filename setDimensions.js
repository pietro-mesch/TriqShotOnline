function setDimensions() {
    const vp = document.getElementById('viewPort');
    const gv = document.getElementById('gameView');
    const VP_WIDTH = vp.width = window.innerWidth * 0.8;
    const VP_HEIGHT = vp.height = VP_WIDTH * 3 / 4;
    gv.width = VP_WIDTH;
    gv.height = VP_HEIGHT;
    
    // var viewPort = document.getElementById("viewPort");
    // viewPort.width = 300;
    // viewPort.heigth = 300;
    // var gameView = document.getElementById("gameView");
    // gameView.width = 300;
    // gameView.heigth = 300;
}

setDimensions();