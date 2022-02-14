import { mdiHandBackRight } from "@mdi/js";
import { Tool } from "../tool";
import { PointerEvent } from "../services/input";
import { Inject } from "../service";
import Viewport from "../services/viewport";

export default class View implements Tool {
    @Inject(Viewport)
    private readonly viewport! : Viewport;

    constructor(
        public name = "View",
        public category = null,
        public icon = mdiHandBackRight,
        public shortcut = { key: "v" },
    ) {}

    onSelected() : void {}

    onDeselected() : void {}

    onActionStart(e : PointerEvent) : void {}

    onActionPointerMove(e: PointerEvent): void {
        // this.viewport.pan();
    }

    onActionEnd(e : PointerEvent) : void {}

    onPointerMove(e : PointerEvent) : void {}

    onFrameUpdate() : void {}

    onDraw() : void {}
}
