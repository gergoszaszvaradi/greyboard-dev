import Point from "../../../common/utils/geometry/point";
import Rect from "../../../common/utils/geometry/rect";
import { Injectable, Lifetime, Service } from "../service";

@Injectable(Lifetime.Transient)
export default class Viewport extends Service {
    public position : Point = new Point();
    public scale = 1;

    reset() : void {
        this.position = new Point();
        this.scale = 1;
    }

    pan(dx : number, dy : number) : void {
        this.position.x += dx / this.scale;
        this.position.y += dy / this.scale;
    }

    panTo(p : Point) : void {
        this.position = p;
    }

    zoom(c : Point, d : number) : void {
        this.pan(-c.x, -c.y);
        this.scale -= d;
        this.pan(c.x, c.y);
    }

    screenToViewport(p : Point) : Point {
        return new Point(-this.position.x + p.x / this.scale, -this.position.y + p.y / this.scale);
    }

    viewportToScreen(p : Point) : Point {
        return new Point((this.position.x + p.x) * this.scale, (this.position.y + p.y) * this.scale);
    }

    getScreenRect() : Rect {
        return new Rect(-this.position.x, -this.position.y, window.innerWidth / this.scale, window.innerHeight / this.scale);
    }
}
