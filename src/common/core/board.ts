import ByteBuffer from "../utils/bytebuffer";
import Point from "../utils/geometry/point";
import Rect, { MinMaxRect } from "../utils/geometry/rect";
import Id from "../utils/id";

export enum BoardItemType {
    None = 0,
    Path,
}

export class BoardItem {
    public type : BoardItemType = BoardItemType.None;
    public id : Id = new Id();
    public rect : Rect = new Rect();
    public cell : MinMaxRect = new MinMaxRect();
    public label : string | null = null;
    public locked = false;
    public zIndex = 0;

    constructor(public createdBy : Id) {}

    isInRect(rect : Rect) : boolean { return false; }
    isInLine(a : Point, b : Point) : boolean { return false; }

    getSerializedSize() : number { return 1 + 1 + (this.label !== null ? this.label.length + 1 : 1) + 4 * 4 + 1; }
    serialize(buffer : ByteBuffer) : ByteBuffer {
        buffer.writeFormatted("bb", this.type, this.locked ? 1 : 0);
        buffer.writeString(this.label || "");
        buffer.writeFormatted("ffffb", this.rect.x, this.rect.y, this.rect.w, this.rect.h, this.zIndex);
        return buffer;
    }

    draw() : void {}
}

export default class Board {
    public name = "New Board";
    public items : Map<string, BoardItem> = new Map();
    public public = false;

    add(items : BoardItem[]) : void {
        for (const item of items)
            this.items.set(item.id.toString(), item);
    }

    move(ids : Iterable<string>, dx : number, dy : number) : void {
        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;

            item.rect.x -= dx;
            item.rect.y -= dy;
        }
    }

    scale(ids : Iterable<string>, dx : number, dy : number) : void {
        const bb = this.getBoundingBoxForItems(ids);

        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;

            item.rect.x -= ((item.rect.x - bb.x) / bb.w) * dx;
            item.rect.y -= ((item.rect.y - bb.y) / bb.h) * dy;
            item.rect.w -= (item.rect.w / bb.w) * dx;
            item.rect.h -= (item.rect.h / bb.h) * dy;
        }
    }

    remove(ids : Iterable<string>) : void {
        for (const id of ids)
            this.items.delete(id);
    }

    bringForward(ids : Iterable<string>) : void {
        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;
            if (item.zIndex < 255)
                item.zIndex++;
        }
    }

    sendBackward(ids : Iterable<string>) : void {
        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;
            if (item.zIndex > 0)
                item.zIndex--;
        }
    }

    setLockState(ids : Iterable<string>, state : boolean) : void {
        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;
            item.locked = state;
        }
    }

    setLabel(id : string, label : string | null) : void {
        const item = this.items.get(id);
        if (!item)
            return;
        item.label = label;
    }

    clear() : void {
        this.items.clear();
    }

    getBoundingBoxForItems(items : Iterable<string> | BoardItem[]) : Rect {
        const rr = Rect.infinite();
        for (let item of items) {
            if (typeof item === "string") {
                const i = this.items.get(item);
                if (!i)
                    continue;
                item = i;
            }
            const r = item.rect;
            if (rr.x > r.x)
                rr.x = r.x;
            if (rr.y > r.y)
                rr.y = r.y;
            if (rr.w < r.x + r.w)
                rr.w = r.x + r.w;
            if (rr.h < r.y + r.h)
                rr.h = r.y + r.h;
        }
        rr.w -= rr.x;
        rr.h -= rr.y;
        return rr;
    }

    getBoundingBox() : Rect {
        return this.getBoundingBoxForItems(Array.from(this.items.values()).map((item) => item.id.toString()));
    }
}
