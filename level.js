const LEVEL_LAYER_ID = "planetLayer";
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

let planet = null;

function newGame(){
    generateLevel();
    drawCurrentLevel();
}

function generateLevel() {
    planet = new Planet(GV_WIDTH, GV_HEIGHT);
}

function drawCurrentLevel(){
    layer = document.getElementById(LEVEL_LAYER_ID);
    ctx = layer.getContext('2d');
    ctx.clearLayer();
    if(planet!=null){drawPlanet(planet)};
}

function drawPlanet(p) {
    ctx.strokeStyle = PLANET_COLOUR;
    ctx.lineWidth = PLANET_THICKNESS;
    ctx.drawCircle(p.x, p.y, p.radius);
    // ctx.beginPath();
    // ctx.ellipse(p.x, p.y, p.radius, p.radius, 0, 0, 2 * Math.PI);
    // ctx.stroke();
}