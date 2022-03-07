import Point from "./point";
import Rect from "./rect";

export function angle(a : Point, b : Point) : number {
    const t = (Math.atan2(a.y - b.y, b.x - a.x) * 180) / Math.PI;
    return (t < 0) ? 360 + t : t;
}

export function dist(a : Point, b : Point) : number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function distSq(a : Point, b : Point) : number {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

export function lineIntersection(x1 : number, y1 : number, x2 : number, y2 : number, x3 : number, y3 : number, x4 : number, y4 : number) : boolean {
    const n = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / n;
    const u = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / n;

    return ((t >= 0 && t <= 1) && (u >= -1 && u <= 0));
}

export function rectIntersection(a : Rect, b : Rect) : boolean {
    return (!(b.x > a.x2 || b.x2 < a.x || b.y > a.y2 || b.y2 < a.y));
}

export function isPointInRect(p : Point, rect : Rect) : boolean {
    return (p.x > rect.x && p.x < rect.x2 && p.y > rect.y && p.y < rect.y2);
}

export function isPointInEllipse(p : Point, c : Point, dx : number, dy : number) : boolean {
    return ((p.x - c.x) * (p.x - c.x)) / (dx * dx) + ((p.y - c.y) * (p.y - c.y)) / (dy * dy) <= 1;
}

export function isLineInRect(l1 : Point, l2 : Point, rect : Rect) : boolean {
    return (isPointInRect(l1, rect) || isPointInRect(l2, rect));
}
