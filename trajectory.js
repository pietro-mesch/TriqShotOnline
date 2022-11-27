const TRAJECTORY_THICKNESS = 3;

class Trajectory{
    constructor(fieldWidth, fieldHeigth){
        this.x1 = Math.floor(Math.random() * (fieldWidth + 1));
        this.y1 = Math.floor(Math.random() * (fieldHeigth + 1));
        this.x2 = Math.floor(Math.random() * (fieldWidth + 1));
        this.y2 = Math.floor(Math.random() * (fieldHeigth + 1));
    }
}

function fire(){
    GameView.drawTrajectory(new Trajectory(GV_WIDTH, GV_HEIGHT))
}