const TRAJECTORY_THICKNESS = 3;

class Trajectory {
    static MAX_LENGTH = 1000;
    points = [];
    constructor(points) { this.points = points; }
}

function fire() {
    if (fci != null) {
        let points = [];
        points.push({ x: fci.x, y: fci.y });
        points.push({ x: fci.x + 1500 * Math.cos(fci.a), y: fci.y - 1500 * Math.sin(fci.a) });
        GameView.drawTrajectory(new Trajectory(points));
    }
}