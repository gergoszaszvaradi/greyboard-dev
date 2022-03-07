import Point from "./point";

export default class Rect {
    constructor(public x : number = 0, public y : number = 0, public w : number = 0, public h : number = 0) {}

    get x2() : number {
        return this.x + this.w;
    }

    get y2() : number {
        return this.y + this.h;
    }

    get center() : Point {
        return new Point(this.x + this.w / 2, this.y + this.h / 2);
    }

    static infinite() : Rect {
        return new Rect(-Infinity, -Infinity, Infinity, Infinity);
    }

    static invertedInfinite() : Rect {
        return new Rect(Infinity, Infinity, -Infinity, -Infinity);
    }

    static fromTwoPoints(a : Point, b : Point) : Rect {
        return new Rect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y));
    }
}

export class MinMaxRect {
    constructor(public min : Point = new Point(), public max : Point = new Point()) {}

    toRect() : Rect {
        return new Rect(this.min.x, this.min.y, this.max.x - this.min.x, this.max.y - this.min.x);
    }
}
