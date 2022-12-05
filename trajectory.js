const TRAJECTORY_LINEWIDTH = 2;
const OLD_TRAJECTORY_LINEWIDTH = 1.5;

class Shot {
    ship;
    trajectory;
    weapon;
    #fired;
    constructor(ship, firstPoint, weapon) {
        this.ship = ship;
        this.trajectory = null;
        this.outcome = 0;
        this.weapon = weapon;
        this.#fired = false;
        this.computeTrajectory(
            firstPoint,
            currentGame.level.planets,
            currentGame.getOkShips()
        );
    }

    computeTrajectory(fromPoint, planets, ships) {
        let dt = 0.001;

        let p = fromPoint;
        p.vx *= this.weapon.v;
        p.vy *= this.weapon.v;
        let t = this.trajectory = new Trajectory([p]);

        //calc first two points
        this.trajectory.extend(planets, dt);

        while (!(this.munitionLost()) && !(t.clippedPlanet(planets)) && !this.hitShip(ships, this.ship)) {
            t.extend(planets, dt);
        }

    }

    munitionLost() {
        return this.trajectory.projectileExpired(this.weapon.projectileLife);
    }

    hitShip(ships, firingShip) {
        let hitConfirmed = false;
        let hitShip = this.trajectory.hitShip(ships);
        if (!(this.#fired) && hitShip != firingShip) { this.#fired = true };
        if (hitShip == firingShip ? this.#fired : hitShip != null) {
            hitConfirmed = true;
            hitShip.status = 1;
            this.status = 1;
        }
        return hitConfirmed;
    }
}

class Trajectory {
    static MAX_LENGTH = 1000;

    points = [];
    constructor(points) { if (points != null) { this.points = points; } }

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

    untilTime(time) {
        let clippedTrajectory = new Trajectory([this.points[0]]);
        let i = 1;
        while (i < this.points.length && this.points[i].t < time) {
            clippedTrajectory.points.push(this.points[i++])
        };
        return clippedTrajectory;
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

    lastSegment() {
        return new Segment(this.points.at(-2), this.points.at(-1))
    }

    projectileExpired(projectileLife) {
        if (this.points.at(-1).t > projectileLife) {
            if (this.points.at(-2).t = projectileLife) {
                this.points.pop();
            } else {
                this.points.at(-1).x += (this.points.at(-2).x - this.points.at(-1).x) * (this.points.at(-1).t - projectileLife) / dt;
                this.points.at(-1).y += (this.points.at(-2).y - this.points.at(-1).y) * (this.points.at(-1).t - projectileLife) / dt;
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

    hitShip(ships) {
        let segment = this.lastSegment();
        let x = segment.end.x;
        let y = segment.end.y;

        let hit = null;
        ships.forEach(ship => {
            if (hit == null && dist(ship.position.x, ship.position.y, x, y) <= ship.radius) {
                hit = ship;
            }
        })
        return hit;
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