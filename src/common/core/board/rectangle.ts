import ByteBuffer from "src/common/utils/bytebuffer";
import Point from "../../utils/geometry/point";
import Rect from "../../utils/geometry/rect";
import { isPointInRect, rectIntersection } from "../../utils/geometry/geometry";
import { BoardItem, BoardItemType } from "../board";

export default class BoardRectangle extends BoardItem {
    public type = BoardItemType.Path;

    constructor(createdBy : string, public rect : Rect, public color : number, public weight : number = 2, public filled : boolean = false) {
        super(createdBy);
    }

    isInRect(rect : Rect) : boolean {
        return rectIntersection(this.rect, rect);
    }

    isInLine(a : Point, b : Point) : boolean {
        const pa = isPointInRect(a, this.rect) ? 1 : 0;
        const pb = isPointInRect(b, this.rect) ? 1 : 0;
        return (this.filled && pa + pb >= 1) || (pa + pb === 1);
    }

    getSerializedSize() : number {
        return super.getSerializedSize() + 4 + 1 + 1;
    }

    serialize(buffer : ByteBuffer) : ByteBuffer {
        super.serialize(buffer);
        buffer.writeFormatted("ibb", this.color, this.weight, this.filled ? 1 : 0);
        return buffer;
    }
}
