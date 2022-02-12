import Point from "./point";

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

export function rectIntersection(x1 : number, y1 : number, w1 : number, h1 : number, x2 : number, y2 : number, w2 : number, h2 : number) : boolean {
    return (!(x2 > x1 + w1 || x2 + w2 < x1 || y2 > y1 + h1 || y2 + h2 < y1));
}

export function isPointInRect(px : number, py : number, x : number, y : number, w : number, h : number) : boolean {
    return (px > x && px < x + w && py > y && py < y + h);
}

export function isLineInRect(lx1 : number, ly1 : number, lx2 : number, ly2 : number, x : number, y : number, w : number, h : number) : boolean {
    return (isPointInRect(lx1, ly1, x, y, w, h) || isPointInRect(lx2, ly2, x, y, w, h));
}
