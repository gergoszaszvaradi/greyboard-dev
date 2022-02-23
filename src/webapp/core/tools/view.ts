import { mdiHandBackRight } from "@mdi/js";
import { Tool, Toolbox } from "../services/toolbox";
import { PointerEvent } from "../services/input";
import Viewport from "../services/viewport";

export default class View implements Tool {
    private prevTool : Tool | null = null;

    constructor(
        private readonly viewport : Viewport,
        private readonly toolbox : Toolbox,
        public name = "View",
        public category = null,
        public icon = mdiHandBackRight,
        public shortcut = { key: "v" },
    ) {}

    onSelected(prevTool : Tool) : void {
        this.prevTool = prevTool;
    }

    onDeselected() : void {}

    onActionStart(e : PointerEvent) : void {}

    onActionPointerMove(e: PointerEvent): void {
        this.viewport.pan(e.movement.inverted());
    }

    onActionEnd(e : PointerEvent) : void {
        if (this.prevTool)
            this.toolbox.selectTool(this.prevTool);
    }

    onPointerMove(e : PointerEvent) : void {}

    onFrameUpdate() : void {}

    onDraw() : void {}
}
