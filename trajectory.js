const TRAJECTORY_LINEWIDTH = 2;
const OLD_TRAJECTORY_LINEWIDTH = 1.5;

class Shot{
    ship;
    trajectory;
    constructor(ship, firstPoint, weaponClass){
        this.ship = ship;
        this.trajectory = Trajectory.fromShot(firstPoint, weaponClass, currentGame.level.planets);
    }
}

class Trajectory {
    static MAX_LENGTH = 1000;

    points = [];
    constructor(points) { if (points != null) { this.points = points; } }

    static fromShot(fromPoint, weaponClass, planets) {
        let dt = 0.001;

        let p = fromPoint;
        p.vx *= Weapon(weaponClass).v;
        p.vy *= Weapon(weaponClass).v;
        let t = new Trajectory([p]);

        //calc first two points
        t.extend(planets, dt);

        while (!(t.projectileExpired(weaponClass)) && !(t.clippedPlanet(planets))) {
            t.extend(planets, dt);
        }
        return t;
    }

    extend(planets, dt) {
        let p = this.lastPoint();
        let acc = this.getAcceleration(planets);
        
        let dx = p.vx * dt + 0.5 * acc.x * dt ** 2;
        let dy = p.vy * dt + 0.5 * acc.y * dt ** 2;
        let dvx = acc.x * dt;
        let dvy = acc.y * dt;
        
        this.points.push(new TrajectoryPoint(
            p.x + dx,
            p.y + dy,
            p.vx + dvx,
            p.vy + dvy,
            p.t + dt)
        );
    }

    getAcceleration(planets) {
        let x = this.lastPoint().x;
        let y = this.lastPoint().y;
        let a = { x: 0, y: 0 };
        planets.forEach(p => {
            let r = getDirectionVector(x, y, p.x, p.y)
            let f = scaleVector(r, p.mass * Phys().G / dist(x, y, p.x, p.y) ** 2);
            a = vectorSum(a.x, a.y, f.x, f.y);
        });
        return a;
    }

    lastPoint() {
        return this.points.at(-1);
    }

    projectileExpired(weaponClass) {
        if (this.points.at(-1).t > Weapon(weaponClass).projectile_life) {
            if (this.points.at(-2).t = Weapon(weaponClass).projectile_life) {
                this.points.pop();
            } else {
                this.points.at(-1).x += (this.points.at(-2).x - this.points.at(-1).x) * (this.points.at(-1).t - Weapon(weaponClass).projectile_life) / dt;
                this.points.at(-1).y += (this.points.at(-2).y - this.points.at(-1).y) * (this.points.at(-1).t - Weapon(weaponClass).projectile_life) / dt;
            }
            return true;
        } else {
            return false;
        }
    }

    clippedPlanet(planets) {
        let clipped = false;
        let x = this.lastPoint().x;
        let y = this.lastPoint().y;
        planets.forEach(pl => {
            if (!clipped) {
                let distance = dist(pl.x, pl.y, x, y);
                if (distance <= pl.radius) {
                    // console.log("distance = " + distance + ", radius = " + pl.radius + " clip");
                    clipped = true;
                } else {
                    // console.log("distance = " + distance + ", radius = " + pl.radius + " fly");
                }
            }
        });
        return clipped;
    }
}


class TrajectoryPoint {
    constructor(x, y, vx, vy, t) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.t = t;
    }
}

let lastTrajectory = null;