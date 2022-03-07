import { mdiEraser } from "@mdi/js";
import Rect from "../../../common/utils/geometry/rect";
import { Tool } from "../services/toolbox";
import Point from "../../../common/utils/geometry/point";
import { PointerEvent } from "../services/input";
import { clear } from "../../../common/utils/array";
import Graphics from "../services/graphics";
import Viewport from "../services/viewport";
import { BoardItem } from "../../../common/core/board";
import ClientBoard from "../services/board";
import { isPointInRect } from "../../../common/utils/geometry/geometry";

export default class Eraser implements Tool {
    private readonly tail : Point[] = [];
    private readonly itemsToDelete : BoardItem[] = [];

    constructor(
        private readonly graphics : Graphics,
        private readonly viewport : Viewport,
        private readonly board : ClientBoard,
        public name = "Eraser",
        public category = null,
        public icon = mdiEraser,
        public shortcut = { key: "e" },
    ) {}

    onSelected() : void {
        clear(this.tail);
        clear(this.itemsToDelete);
    }

    onDeselected() : void {
        clear(this.tail);
        clear(this.itemsToDelete);
        this.onActionEnd();
    }

    onActionStart(e : PointerEvent) : void {
        clear(this.tail);
        clear(this.itemsToDelete);
        this.tail.push(this.viewport.screenToViewport(e.position));
    }

    onActionPointerMove(e: PointerEvent): void {
        const mp = this.viewport.screenToViewport(e.position);
        const mpp = this.viewport.screenToViewport(e.prevPosition);

        this.tail.push(mp);

        const items = this.board.getItemsCloseToRect(Rect.fromTwoPoints(mpp, mp));
        for (const item of items) {
            if (item.locked)
                continue;

            if ((item.rect.w * item.rect.h < 10 && isPointInRect(mp, item.rect)) || item.isInLine(mpp, mp)) {
                this.itemsToDelete.push(item);
                this.board.remove([item.id]);
            }
        }
    }

    onActionEnd(e? : PointerEvent) : void {
        clear(this.tail);
        // TODO: submit change to action stack
        clear(this.itemsToDelete);
    }

    onPointerMove(e : PointerEvent) : void {}

    onFrameUpdate() : void {
        if (this.tail.length > 5)
            this.tail.shift();
    }

    onDraw() : void {
        if (this.tail.length === 0)
            return;
        this.graphics.stroke(0xFFFFFF50, this.viewport.pixelsToViewport(4));
        this.graphics.curve(this.tail);
    }
}
