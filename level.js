const PLANET_THICKNESS = 3;
const PLANET_MIN_RADIUS = 25;
const PLANET_MAX_RADIUS = 150;
const PLANET_DENSITY = 10000;

class Planet {
    constructor(fieldWidth, fieldHeigth) {
        this.x = Math.floor(Math.random() * (fieldWidth + 1));
        this.y = Math.floor(Math.random() * (fieldHeigth + 1));
        this.radius = Math.floor(Math.random() * (PLANET_MAX_RADIUS - PLANET_MIN_RADIUS + 1)) + PLANET_MIN_RADIUS;
        this.mass = PLANET_DENSITY * this.radius ^ 3 * Math.PI * 4 / 3;
    }
}

class Level {
    constructor() {
        this.planets = [new Planet(GV_WIDTH, GV_HEIGHT)];
    }
}

function generateLevel() {
    currentLevel = new Level();
}