import { mdiEraser } from "@mdi/js";
import { Tool } from "../tool";
import Point from "../../../common/utils/geometry/point";
import { PointerEvent } from "../services/input";
import { clear } from "../../../common/utils/array";
import { Inject } from "../service";
import Graphics from "../services/graphics";
import Viewport from "../services/viewport";

export default class Eraser implements Tool {
    @Inject(Graphics)
    private readonly graphics! : Graphics;

    @Inject(Viewport)
    private readonly viewport! : Viewport;

    private readonly tail : Point[] = [];

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
        clear(this.tail);
        this.tail.push(this.viewport.screenToViewport(e.getPosition()));
    }

    onActionPointerMove(e: PointerEvent): void {

    }

    onActionEnd(e : PointerEvent) : void {
        // throw new Error("Method not implemented.");
    }

    onPointerMove(e : PointerEvent) : void {
        // throw new Error("Method not implemented.");
    }

    onFrameUpdate() : void {
        // throw new Error("Method not implemented.");
    }

    onDraw() : void {
        // throw new Error("Method not implemented.");
    }
}
