CanvasRenderingContext2D.prototype.clearLayer =
    function () {
        this.clearRect(0, 0, GV_WIDTH, GV_HEIGHT);
    }

CanvasRenderingContext2D.prototype.drawCircle =
    function (x_centre, y_centre, radius) {
        this.beginPath();
        this.ellipse(x_centre, y_centre, radius, radius, 0, 0, 2 * Math.PI);
        this.stroke();
    }