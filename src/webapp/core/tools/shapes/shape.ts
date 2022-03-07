import { mdiShape } from "@mdi/js";
import Rect from "../../../../common/utils/geometry/rect";
import { Tool, Toolbox, ToolCategory } from "../../services/toolbox";
import Point from "../../../../common/utils/geometry/point";
import { PointerEvent, Shortcut } from "../../services/input";
import Graphics from "../../services/graphics";
import Viewport from "../../services/viewport";
import ClientBoard from "../../services/board";
import { BoardItem } from "../../../../common/core/board";

export default class ShapeTool implements Tool {
    protected start : Point = new Point();
    protected end : Point = new Point();

    constructor(
        protected readonly graphics : Graphics,
        protected readonly viewport : Viewport,
        protected readonly toolbox : Toolbox,
        protected readonly board : ClientBoard,
        public name = "Shape",
        public category = ToolCategory.Shapes,
        public icon = mdiShape,
        public shortcut : Shortcut | null = null,
    ) {}

    onSelected() : void {}

    onDeselected() : void {}

    onActionStart(e : PointerEvent) : void {
        this.start = this.end = this.viewport.screenToViewport(e.position);
    }

    onActionPointerMove(e : PointerEvent) : void {
        this.end = this.viewport.screenToViewport(e.position);
    }

    onActionEnd(e : PointerEvent) : void {
        const rect = Rect.fromTwoPoints(this.start, this.end);

        const item = this.createShape(rect);
        if (!item)
            return;

        this.board.add([item]);
    }

    onDraw() : void {}

    onPointerMove(e: PointerEvent): void {}
    onFrameUpdate(): void {}

    protected createShape(rect : Rect) : BoardItem | null {
        return null;
    }
}
