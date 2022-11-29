function dist(p1x, p1y, p2x, p2y) {
    return Math.sqrt((p2x - p1x) ** 2 + (p2y - p1y) ** 2);
}

function vectorSum(x1, y1, x2, y2) {
    return {
        x: x1 + x2,
        y: y1 + y2
    }
}

function getDirectionVector(from_x, from_y, to_x, to_y) {
    let l = dist(from_x, from_y, to_x, to_y);
    let v = { x: to_x - from_x, y: to_y - from_y };
    return { x: v.x / l, y: v.y / l }
}

function scaleVector(v, s) {
    if (s < 0) {
        console.log(s);
    }
    return { x: v.x * s, y: v.y * s }
}

class Box {
    constructor(xmin, ymin, xmax, ymax) {
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
    }
    randomPoint() {
        return {
            x: this.xmin + Math.floor(Math.random() * (this.xmax - this.xmin + 1)),
            y: this.ymin + Math.floor(Math.random() * (this.ymax - this.ymin + 1)),
        }
    }
}