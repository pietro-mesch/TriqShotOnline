const PLANET_THICKNESS = 3;
const PLANET_MIN_RADIUS = 25;
const PLANET_MAX_RADIUS = 150;
const PLANET_DENSITY = 10000;

class Planet {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.radius = Math.floor(Math.random() * (PLANET_MAX_RADIUS - PLANET_MIN_RADIUS + 1)) + PLANET_MIN_RADIUS;
        this.mass = PLANET_DENSITY * this.radius ^ 3 * Math.PI * 4 / 3;
    }
}

class Level {
    constructor() {
        this.planets = [new Planet(GameView.getPlanetBox().randomPoint())];
    }
}