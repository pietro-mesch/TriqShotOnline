const TRAJECTORY_THICKNESS = 3;

class Trajectory {
    static MAX_LENGTH = 1000;
    points = [];
    constructor(points) { if (points != null){this.points = points;} }
    
    static fromShot(fromPoint, weaponClass, planets) {
        let dt = 1;
        
        let t = new Trajectory();
        let p = fromPoint;
        p.v *= Weapon(weaponClass).v;
        t.points.push(p);

        while (t.points.at(-1).t < Weapon(weaponClass).projectile_life) {
            let nextPoint = this.getNextPoint(t.points.at(-1), planets, dt);
            t.points.push(nextPoint);
        }
        return t;
    }
    static getNextPoint(p, planets, dt) {
        let dx = p.v * dt * Math.cos(p.a);
        let dy = - p.v * dt * Math.sin(p.a);
        return new TrajectoryPoint(
            p.x + dx,
            p.y + dy,
            p.a,
            p.v,
            p.t + dt);
    }
}

class TrajectoryPoint {
    constructor(x, y, a, v, t) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.v = v;
        this.t = t;
    }
}

let lastTrajectory = null;

function fire() {
    if (fci != null) {
        lastTrajectory = Trajectory.fromShot(fci.getFiringVector(),fci.weapon);
        GameView.drawTrajectory(lastTrajectory);
    }
}