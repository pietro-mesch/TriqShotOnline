const vp = document.getElementById('viewPort');
const gv = document.getElementById('gameView');
const VP_WIDTH = vp.width = window.innerWidth * 0.8;
const VP_HEIGHT = vp.height = VP_WIDTH * 3 / 4;
// gv.width = VP_WIDTH;
// gv.height = VP_HEIGHT;

const ctx = gv.getContext('2d');

function generateLevel() {
    ctx.clearRect(0, 0, VP_WIDTH, VP_HEIGHT);
    ctx.fillStyle = "#32cd32";

    x = Math.floor(Math.random() * (VP_WIDTH + 1));
    y = Math.floor(Math.random() * (VP_HEIGHT + 1));

    ctx.fillRect(x, y, 50, 50);

    requestAnimationFrame();
}