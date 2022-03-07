import createDelegate from "../../../common/utils/delegate";
import Point from "../../../common/utils/geometry/point";
import Rect from "../../../common/utils/geometry/rect";
import { inRange } from "../../../common/utils/utils";
import { Injectable, Lifetime, Service } from "../../../common/core/di";

@Injectable(Lifetime.Singleton)
export default class Viewport implements Service {
    public position : Point = new Point();
    public scale = 1;

    public onScaleChanged = createDelegate<[scale : number]>();

    start() : void { this.reset(); }
    stop() : void { this.reset(); }

    reset() : void {
        this.position = new Point();
        this.scale = 1;
    }

    pan(d : Point) : void {
        this.position.x += d.x / this.scale;
        this.position.y += d.y / this.scale;
    }

    panTo(p : Point) : void {
        this.position = p;
    }

    zoom(c : Point, d : number) : void {
        if (!inRange(this.scale - d, 0.1, 4))
            return;
        this.pan(c.inverted());
        this.scale -= d;
        this.pan(c);
        this.onScaleChanged(this.scale);
    }

    multiplyZoom(c : Point, d : number) : void {
        if (!inRange(this.scale * d, 0.1, 4))
            return;
        this.pan(c.inverted());
        this.scale *= d;
        this.pan(c);
        this.onScaleChanged(this.scale);
    }

    screenToViewport(p : Point) : Point {
        return new Point(-this.position.x + p.x / this.scale, -this.position.y + p.y / this.scale);
    }

    viewportToScreen(p : Point) : Point {
        return new Point((this.position.x + p.x) * this.scale, (this.position.y + p.y) * this.scale);
    }

    pixelsToViewport(pixels : number) : number {
        return pixels / this.scale;
    }

    getScreenRect() : Rect {
        return new Rect(-this.position.x, -this.position.y, window.innerWidth / this.scale, window.innerHeight / this.scale);
    }
}
