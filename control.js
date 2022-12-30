document.addEventListener("keydown", function (e) { e.preventDefault(); e.stopPropagation(); keyDown(e); }, { passive: false });

async function fire() {
    if (fci != null) {
        let shot = fci.fire();
        GameView.hideFCI();
        await GameView.animateShot(shot);
    }
}

function clearFireControl() {
    fci = null;
}

function switchFireControl() {
    if (currentGame != null) {
        fci = new FireControlInterface(currentGame.getActivePlayer().selectNextShip());
        GameView.drawFCI(fci);
    }
}

function mouseDownInGameView(mouseDownEvent) {
    if (fci != null) {
        let scaled = GameView.getScaledCoordinates(mouseDownEvent.clientX, mouseDownEvent.clientY);
        fci.trackPoint(scaled.x, scaled.y);
        fci.trackingMouse = true;
        GameView.drawFCI(fci);
    }
}

function mouseMoveInGameView(mouseMoveEvent) {
    if (fci != null && fci.trackingMouse) {
        let scaled = GameView.getScaledCoordinates(mouseMoveEvent.clientX, mouseMoveEvent.clientY);
        fci.trackPoint(scaled.x, scaled.y);
        GameView.drawFCI(fci);
    }
}

function mouseUpInGameView(mouseUpEvent) {
    if (fci != null && fci.trackingMouse) {
        fci.trackingMouse = false;
        let scaled = GameView.getScaledCoordinates(mouseUpEvent.clientX, mouseUpEvent.clientY);
        fci.trackPoint(scaled.x, scaled.y);
        GameView.drawFCI(fci);
    }
}

function mouseLeftGameView(mouseLeaveEvent) {
    if (fci != null && fci.trackingMouse) {
        fci.trackingMouse = false;
        GameView.drawFCI(fci);
    }
}

function mouseWheelInGameView(mouseWheelEvent) {
    if (fci != null) {
        fci.adjustVelocity(-mouseWheelEvent.deltaY, mouseWheelEvent.shiftKey, mouseWheelEvent.ctrlKey);
        GameView.drawFCI(fci);
    }
}

function keyDown(keyDownEvent) {
    switch (keyDownEvent.keyCode) {
        //spacebar
        case 32:
            fire();
            break;

        //tab
        case 9:
            switchFireControl();
            break;

        //arrow up
        case 38:
            if (fci != null) {
                fci.adjustVelocity(+1, keyDownEvent.shiftKey, keyDownEvent.ctrlKey);
                GameView.drawFCI(fci);
            };
            break;

        //arrow down
        case 40:
            if (fci != null) {
                fci.adjustVelocity(-1, keyDownEvent.shiftKey, keyDownEvent.ctrlKey);
                GameView.drawFCI(fci);
            };
            break;

        //arrow left
        case 37:
            if (fci != null) {
                fci.adjustAngle(+1, keyDownEvent.shiftKey, keyDownEvent.ctrlKey);
                GameView.drawFCI(fci);
            };
            break;

        //arrow right
        case 39:
            if (fci != null) {
                fci.adjustAngle(-1, keyDownEvent.shiftKey, keyDownEvent.ctrlKey);
                GameView.drawFCI(fci);
            };
            break;

        default:
            break;
    }

}

function inputPlanets() {
    var slider = document.getElementById("planetSlider");
    var label = document.getElementById("planetLabel");
    label.textContent = "PLANETS: " + slider.value;
}

function inputShips() {
    var slider = document.getElementById("shipSlider");
    var label = document.getElementById("shipLabel");
    label.textContent = "SHIPS: " + slider.value;
}

let fci = null;

class FiringVector {
    constructor(angle, velocity) {
        this.a = angle;
        this.v = velocity
    }
}

class FireControlInterface {
    constructor(ship) {
        this.ship = ship;
        if (ship.lastFiringVector != null) {
            this.a = ship.lastFiringVector.a;
            this.v = ship.lastFiringVector.v;
        } else {
            this.a = angle(ship.position.x,ship.position.y,GameView.dimensions.width/2,GameView.dimensions.height/2);
            this.v = 0.4;
        };
        this.trackingMouse = false;
        this.weapon = "standard"
    }

    getCurrentFiringVector() {
        return new FiringVector(this.a, this.v);
    }

    getFirstTrajectoryPoint() {
        return new TrajectoryPoint(
            this.ship.position.x,
            this.ship.position.y,
            this.v * Math.cos(this.a),
            - this.v * Math.sin(this.a),
            0)
    };

    fire(){
        this.ship.lastFiringVector = fci.getCurrentFiringVector();
        return this.getCurrentShot();
    }

    getCurrentShot() {
        return new Shot(this.ship, fci.getFirstTrajectoryPoint(), Weapon(fci.weapon));
    }

    trackPoint(x, y) {
        // this.a = Math.atan((this.ship.position.y - y) / (x - this.ship.position.x)) + (x >= this.ship.position.x ? 0 : Math.PI);
        this.a = angle(this.ship.position.x, this.ship.position.y, x, y);
    }

    adjustVelocity(delta, fast, slow) {
        this.v = Math.max(0.001, Math.min(1, this.v + Math.sign(delta) * 0.01 * (fast ? 10 : 1) * (slow ? 0.05 : 1)));
    }
    adjustAngle(delta, fast, slow) {
        this.a += Math.sign(delta) * 0.01 * (fast ? 10 : 1) * (slow ? 0.05 : 1);
        while (this.a < 0) { this.a += 2 * Math.PI };
        while (this.a >= 2 * Math.PI) { this.a -= 2 * Math.PI };
    }
}