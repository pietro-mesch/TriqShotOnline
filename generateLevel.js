const vp = document.getElementById('viewPort');
const gv = document.getElementById('gameView');
const VP_WIDTH = vp.width = window.innerWidth * 0.8;
const VP_HEIGHT = vp.height = VP_WIDTH * 3 / 4;

const ctx = gv.getContext('2d');

const PLANET_COLOUR = "#32cd32";
const PLANET_THICKNESS = 3;
const PLANET_MIN_RADIUS = 25;
const PLANET_MAX_RADIUS = 150;

class Planet {
    constructor(fieldWidth, fieldHeigth) {
        this.x = Math.floor(Math.random() * (fieldWidth + 1));
        this.y = Math.floor(Math.random() * (fieldHeigth + 1));
        this.radius = Math.floor(Math.random() * (PLANET_MAX_RADIUS - PLANET_MIN_RADIUS + 1)) + PLANET_MIN_RADIUS;
        this.mass = this.radius ^ 3 * Math.PI * 4 / 3;
    }
}


function generateLevel() {
    ctx.clearRect(0, 0, VP_WIDTH, VP_HEIGHT);
    
    p = new Planet(VP_WIDTH, VP_HEIGHT);
    drawPlanet(p);

    requestAnimationFrame();
}

function drawPlanet(p) {
    ctx.strokeStyle = PLANET_COLOUR;
    ctx.lineWidth = PLANET_THICKNESS;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.radius, p.radius, 0, 0, 2 * Math.PI);
    ctx.stroke();
}