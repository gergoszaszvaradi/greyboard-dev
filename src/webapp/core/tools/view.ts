import { mdiHandBackRight } from "@mdi/js";
import tweenjs, { Tween } from "@tweenjs/tween.js";
import { Tool, Toolbox, ToolCategory } from "../services/toolbox";
import Input, { PointerEvent } from "../services/input";
import Viewport from "../services/viewport";
import Point from "../../../common/utils/geometry/point";

export default class View implements Tool {
    private prevTool : Tool | null = null;
    private inertiaTween : Tween<Point> | null = null;

    constructor(
        private readonly viewport : Viewport,
        private readonly input : Input,
        private readonly toolbox : Toolbox,
        public name = "View",
        public category = ToolCategory.Controls,
        public icon = mdiHandBackRight,
        public shortcut = { key: "v" },
    ) {}

    onSelected(prevTool : Tool) : void {
        this.prevTool = prevTool;
    }

    onDeselected() : void {}

    onActionStart(e : PointerEvent) : void {
        if (this.inertiaTween)
            tweenjs.remove(this.inertiaTween);
    }

    onActionPointerMove(e: PointerEvent): void {
        this.viewport.pan(e.movement.inverted());
    }

    onActionEnd(e : PointerEvent) : void {
        if (this.prevTool)
            this.toolbox.selectTool(this.prevTool);

        const dx = this.input.pointerPosition.x - this.input.pointerPrevPosition.x;
        const dy = this.input.pointerPosition.y - this.input.pointerPrevPosition.y;

        if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2)
            return;

        this.inertiaTween = new tweenjs.Tween(this.viewport.position)
            .to({ x: this.viewport.position.x + dx * 5, y: this.viewport.position.y + dy * 5 }, 500)
            .easing(tweenjs.Easing.Cubic.Out)
            .start()
            .onComplete(() => { this.inertiaTween = null; });
    }

    onPointerMove(e : PointerEvent) : void {}

    onFrameUpdate(time : number) : void {}

    onDraw() : void {}
}
