// const vp = document.getElementById('viewPort');
const gv = document.getElementById('gameView');
// const VP_WIDTH = vp.width = window.innerWidth * 0.8;
// const VP_HEIGHT = vp.height = VP_WIDTH * 3 / 4;
// gv.width = VP_WIDTH;
// gv.height = VP_HEIGHT;

const ctx = gv.getContext('2d');
let x = 0;

function generateLevel() {
    ctx.clearRect(0, 0, VP_WIDTH, VP_HEIGHT);
    ctx.fillStyle = "#32cd32";
    ctx.fillRect(x, 10, 50, 50);
    x++;
    if (x > VP_WIDTH) {
        x = 0;
    }
    requestAnimationFrame(generateLevel);
}