const PLANET_THICKNESS = 3;
const PLANET_MIN_RADIUS = 25;
const PLANET_MAX_RADIUS = 150;
const PLANET_DENSITY = 10000;
const PLANET_GAP = 1.2;

class Planet {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.radius = Math.floor(Math.random() * (PLANET_MAX_RADIUS - PLANET_MIN_RADIUS + 1)) + PLANET_MIN_RADIUS;
        this.mass = PLANET_DENSITY * this.radius ^ 3 * Math.PI * 4 / 3;
    }
}

class Level {
    constructor(numPlanets) {
        this.planets = this.generatePlanets(numPlanets);
    }

    generatePlanets(numPlanets){
        var planets = [];
        var p = null;
        for (let i = 0; i < numPlanets; i++) {
            while (!this.planetOk(p,planets)) {
                p = new Planet(GameView.getPlanetBox().randomPoint());
            }
            planets.push(p);
        }
        return planets;
    }

    planetOk(p1,pp){
        var check = true;
        if (p1 == null) {
            check = false;
        } else {
            pp.forEach(p2 => {
                if (this.planetsTouch(p1,p2)){
                    check = false;
                };
            });
        }
        return check;
    }

    planetsTouch(p1, p2) {
        var dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        return dist < (p1.radius + p2.radius) * PLANET_GAP;
    }
}