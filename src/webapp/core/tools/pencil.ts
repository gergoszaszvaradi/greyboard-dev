import { mdiPencil } from "@mdi/js";
import { Tool } from "../tool";
import Point from "../../../common/utils/point";
import app, { PointerEvent } from "../app";

export default class Pencil implements Tool {
    private buffer : Point[] = [];

    constructor(
        public name = "Pencil",
        public category = null,
        public icon = mdiPencil,
        public shortcut = { key: "p" },
    ) {}

    onSelected() : void {
        this.buffer.splice(0, this.buffer.length);
    }

    onDeselected() : void {
        this.buffer.splice(0, this.buffer.length);
    }

    onActionStart(e : PointerEvent) : void {
        this.buffer.splice(0, this.buffer.length);
        this.buffer.push(app.graphics.viewport.screenToViewport(e.position));
    }

    onPointerMove(e : PointerEvent) : void {
        // throw new Error("Method not implemented.");
    }

    onFrameUpdate() : void {
        // throw new Error("Method not implemented.");
    }

    onActionEnd(e : PointerEvent) : void {
        // throw new Error("Method not implemented.");
    }

    onDraw() : void {
        // throw new Error("Method not implemented.");
    }
}
