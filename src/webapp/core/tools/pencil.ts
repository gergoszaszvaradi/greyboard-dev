import { mdiPencil } from "@mdi/js";
import { clear } from "../../../common/utils/array";
import { Tool, Toolbox, ToolCategory } from "../services/toolbox";
import Point from "../../../common/utils/geometry/point";
import { PointerEvent, Shortcut } from "../services/input";
import ClientBoardPath from "../board/path";
import Graphics from "../services/graphics";
import Viewport from "../services/viewport";
import ClientBoard from "../services/board";
import generateId from "../../../common/utils/id";

export default class Pencil implements Tool {
    private readonly buffer : Point[] = [];

    constructor(
        private readonly graphics : Graphics,
        private readonly viewport : Viewport,
        private readonly toolbox : Toolbox,
        private readonly board : ClientBoard,
        public name = "Pencil",
        public category : ToolCategory | null = null,
        public icon = mdiPencil,
        public shortcut : Shortcut = { key: "b" },
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
        if (this.buffer.length === 0)
            return;

        // todo: create item with network id
        const path = new ClientBoardPath(this.graphics, generateId(), this.buffer, this.toolbox.selectedColor, this.toolbox.selectedWeight);
        path.optimize();
        path.calculateRect();
        path.normalize();

        this.board.add([path]);
        clear(this.buffer);
    }

    onDraw() : void {
        if (this.buffer.length === 0)
            return;
        this.graphics.stroke(this.toolbox.selectedColor, this.toolbox.selectedWeight);
        this.graphics.curve(this.buffer);
    }

    onPointerMove(e: PointerEvent): void {}
    onFrameUpdate(): void {}
}
