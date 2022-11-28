const TRAJECTORY_THICKNESS = 3;

class Trajectory {
    static MAX_LENGTH = 1000;
    points = [];
    constructor(points) { this.points = points; }
    static fromShot(fromPoint, planets) {
        let dt = 1;
        let weapon_tmax = 1;
        let points = [fromPoint];
        while (points.at(-1).t < weapon_tmax) {
            let nextPoint = this.getNextPoint(points.at(-1), planets, dt);
            points.push(nextPoint);
        }
        return new Trajectory(points);
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
        lastTrajectory = Trajectory.fromShot(fci.getFiringVector());
        GameView.drawTrajectory(lastTrajectory);
    }
}