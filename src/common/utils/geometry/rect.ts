import Point from "./point";

export default class Rect {
    constructor(public x : number = 0, public y : number = 0, public w : number = 0, public h : number = 0) {}

    public static infinite() : Rect {
        return new Rect(-Infinity, -Infinity, Infinity, Infinity);
    }
}

export class MinMaxRect {
    constructor(public min : Point = new Point(), public max : Point = new Point()) {}

    toRect() : Rect {
        return new Rect(this.min.x, this.min.y, this.max.x - this.min.x, this.max.y - this.min.x);
    }
}
