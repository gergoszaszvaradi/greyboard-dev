import { mdiEraser } from "@mdi/js";
import { Tool } from "../tool";
import Point from "../../../common/utils/point";
import app, { PointerEvent } from "../app";

export default class Eraser implements Tool {
    private tail : Point[] = [];

    constructor(
        public name = "Eraser",
        public category = null,
        public icon = mdiEraser,
        public shortcut = { key: "e" },
    ) {}

    onSelected() : void {
        this.tail.splice(0, this.tail.length);
    }

    onDeselected() : void {
        this.tail.splice(0, this.tail.length);
    }

    onActionStart(e : PointerEvent) : void {
        this.tail.splice(0, this.tail.length);
        this.tail.push(app.graphics.viewport.screenToViewport(e.position));
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
