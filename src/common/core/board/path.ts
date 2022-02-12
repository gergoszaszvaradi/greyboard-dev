import ByteBuffer from "src/common/utils/bytebuffer";
import Color from "src/common/utils/color";
import Point from "src/common/utils/geometry/point";
import Id from "src/common/utils/id";
import Rect from "../../utils/geometry/rect";
import {
    angle, distSq, isPointInRect, lineIntersection,
} from "../../utils/geometry/geometry";
import { BoardItem, BoardItemType } from "../board";

export default class BoardPath extends BoardItem {
    public type = BoardItemType.Path;
    public rect = Rect.infinite();

    constructor(createdBy : Id, public points : Point[] = [], public color : Color, public weight : number = 2) {
        super(createdBy);
    }

    calculateRect() : void {
        for (const point of this.points) {
            if (point.x < this.rect.x) { this.rect.x = point.x; }
            if (point.x > this.rect.w) { this.rect.w = point.x; }
            if (point.y < this.rect.y) { this.rect.y = point.y; }
            if (point.y > this.rect.h) { this.rect.h = point.y; }
        }
        this.rect.w -= this.rect.x;
        this.rect.h -= this.rect.y;
        if (this.rect.w === 0) { this.rect.w = 1; }
        if (this.rect.h === 0) { this.rect.h = 1; }
    }

    normalize() : void {
        for (const point of this.points) {
            point.x = (point.x - this.rect.x) / this.rect.w;
            point.y = (point.y - this.rect.y) / this.rect.h;
        }
    }

    optimize() : void {
        if (this.points.length === 1) { return; }

        const points = [];
        points.push(this.points[this.points.length - 1]);
        for (let i = this.points.length - 2; i >= 2; i--) {
            const next = this.points[i];
            const curr = this.points[i - 1];
            const prev = this.points[i - 2];
            const dist = distSq(next, prev);
            if (dist > 9) {
                const a1 = angle(prev, curr);
                const a2 = angle(curr, next);
                if (Math.abs(a1 - a2) < 3) { continue; }
            }
            points.push(this.points[i]);
        }
        points.push(this.points[0]);
        this.points = points;
    }

    isInRect(rect : Rect) : boolean {
        for (const p of this.points) { if (isPointInRect(p.x * this.rect.w + this.rect.x, p.y * this.rect.h + this.rect.y, rect.x, rect.y, rect.w, rect.h)) return true; }

        for (let i = 1; i < this.points.length; i++) {
            if (
                lineIntersection(rect.x, rect.y, rect.x + rect.w, rect.y, this.points[i].x * this.rect.w + this.rect.x, this.points[i].y * this.rect.h + this.rect.y, this.points[i - 1].x * this.rect.w + this.rect.x, this.points[i - 1].y * this.rect.h + this.rect.y)
                || lineIntersection(rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h, this.points[i].x * this.rect.w + this.rect.x, this.points[i].y * this.rect.h + this.rect.y, this.points[i - 1].x * this.rect.w + this.rect.x, this.points[i - 1].y * this.rect.h + this.rect.y)
                || lineIntersection(rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h, this.points[i].x * this.rect.w + this.rect.x, this.points[i].y * this.rect.h + this.rect.y, this.points[i - 1].x * this.rect.w + this.rect.x, this.points[i - 1].y * this.rect.h + this.rect.y)
                || lineIntersection(rect.x, rect.y, rect.x, rect.y + rect.h, this.points[i].x * this.rect.w + this.rect.x, this.points[i].y * this.rect.h + this.rect.y, this.points[i - 1].x * this.rect.w + this.rect.x, this.points[i - 1].y * this.rect.h + this.rect.y)
            ) return true;
        }

        return false;
    }

    isInLine(a : Point, b : Point) : boolean {
        for (let i = 1; i < this.points.length; i++) { if (lineIntersection(a.x, a.y, b.x, b.y, this.points[i].x * this.rect.w + this.rect.x, this.points[i].y * this.rect.h + this.rect.y, this.points[i - 1].x * this.rect.w + this.rect.x, this.points[i - 1].y * this.rect.h + this.rect.y)) return true; }
        return false;
    }

    getSerializedSize() : number {
        return super.getSerializedSize() + ((1 + this.points.length * 2) * 4) + 4 + 1;
    }

    serialize(buffer : ByteBuffer) : ByteBuffer {
        super.serialize(buffer);
        buffer.writeUInt(this.points.length);
        for (const point of this.points) { buffer.writeFormatted("ff", point.x, point.y); }
        buffer.writeFormatted("ib", this.color.toUInt(), this.weight);
        return buffer;
    }
}
