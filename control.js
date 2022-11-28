document.addEventListener("keydown", function (e) {e.preventDefault();e.stopPropagation();keyDown(e);}, { passive: false });

function switchFireControl() {
    let position = GameView.getRandomCoordinates();
    fci = new FireControlInterface(position.x, position.y);
    GameView.drawFCI(fci);
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

let fci = null;

class FireControlInterface {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = Math.random() * 2 * Math.PI;
        this.v = Math.random();
        this.trackingMouse = false;
        this.weapon = "standard"
    }

    getFiringVector(){return new TrajectoryPoint(
        this.x,
        this.y,
        this.a,
        this.v,
        0)};

    trackPoint(x, y) {
        this.a = Math.atan((this.y - y) / (x - this.x)) + (x >= this.x ? 0 : Math.PI);
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