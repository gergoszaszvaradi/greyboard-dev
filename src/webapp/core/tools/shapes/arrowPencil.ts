import { mdiArrowUpRight } from "@mdi/js";
import { angleInRadians } from "../../../../common/utils/geometry/geometry";
import Point from "../../../../common/utils/geometry/point";
import { Tool, Toolbox, ToolCategory } from "../../services/toolbox";
import Graphics from "../../services/graphics";
import Viewport from "../../services/viewport";
import ClientBoard from "../../services/board";
import ClientBoardArrow from "../../board/arrow";
import { clear } from "../../../../common/utils/array";
import { PointerEvent, KeyModifiers, Shortcut } from "../../services/input";

export default class ArrowPencil implements Tool {
    private readonly buffer : Point[] = [];

    constructor(
        protected readonly graphics : Graphics,
        protected readonly viewport : Viewport,
        protected readonly toolbox : Toolbox,
        protected readonly board : ClientBoard,
        public name = "Arrow Pencil",
        public category = ToolCategory.Shapes,
        public icon = mdiArrowUpRight,
        public shortcut : Shortcut = { key: "a", modifiers: KeyModifiers.Shift },
    ) {}

    onSelected() : void {
        clear(this.buffer);
    }

    onDeselected() : void {
        this.onActionEnd();
    }

    onActionStart(e : PointerEvent) : void {
        clear(this.buffer);
        this.buffer.push(this.viewport.screenToViewport(e.position));
    }

    onActionPointerMove(e : PointerEvent) : void {
        this.buffer.push(this.viewport.screenToViewport(e.position));
    }

    onActionEnd(e? : PointerEvent) : void {
        if (this.buffer.length < 2)
            return;

        const path = new ClientBoardArrow(this.graphics, "", this.buffer, this.toolbox.selectedColor, this.toolbox.selectedWeight);
        path.optimize();
        path.calculateRect();
        path.normalize();

        this.board.add([path]);
        clear(this.buffer);
    }

    onDraw() : void {
        if (this.buffer.length < 2)
            return;

        const start = this.buffer[this.buffer.length - (this.buffer.length > 2 ? 3 : 2)];
        const end = this.buffer[this.buffer.length - 1];
        const a = -angleInRadians(start, end);
        const tip1 = new Point(Math.cos(a + Math.PI * 0.8) * this.toolbox.selectedWeight * 5 + end.x, Math.sin(a + Math.PI * 0.8) * this.toolbox.selectedWeight * 5 + end.y);
        const tip2 = new Point(Math.cos(a - Math.PI * 0.8) * this.toolbox.selectedWeight * 5 + end.x, Math.sin(a - Math.PI * 0.8) * this.toolbox.selectedWeight * 5 + end.y);

        this.graphics.stroke(this.toolbox.selectedColor, this.toolbox.selectedWeight);
        this.graphics.curve(this.buffer);
        this.graphics.line(end.x, end.y, tip1.x, tip1.y);
        this.graphics.line(end.x, end.y, tip2.x, tip2.y);
    }

    onPointerMove(e: PointerEvent): void {}
    onFrameUpdate(): void {}
}
