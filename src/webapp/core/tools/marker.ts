import { mdiMarker } from "@mdi/js";
import Color from "../../../common/utils/color";
import { clear } from "../../../common/utils/array";
import { Tool, Toolbox } from "../services/toolbox";
import Point from "../../../common/utils/geometry/point";
import { PointerEvent } from "../services/input";
import ClientBoardPath from "../board/path";
import Graphics from "../services/graphics";
import Viewport from "../services/viewport";
import ClientBoard from "../services/board";
import generateId from "../../../common/utils/id";

export default class Marker implements Tool {
    private readonly buffer : Point[] = [];

    constructor(
        private readonly graphics : Graphics,
        private readonly viewport : Viewport,
        private readonly toolbox : Toolbox,
        private readonly board : ClientBoard,
        public name = "Marker",
        public category = null,
        public icon = mdiMarker,
        public shortcut = { key: "m" },
    ) {}

    private get markerColor() : number {
        return Color.withAlpha(this.toolbox.selectedColor, 128);
    }

    private get markerWeight() : number {
        return this.toolbox.selectedWeight * 5;
    }

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
        const path = new ClientBoardPath(this.graphics, generateId(), this.buffer, this.markerColor, this.markerWeight);
        path.zIndex = 0;
        path.optimize();
        path.calculateRect();
        path.normalize();

        this.board.add([path]);
        clear(this.buffer);
    }

    onDraw() : void {
        if (this.buffer.length === 0)
            return;
        this.graphics.stroke(this.markerColor, this.markerWeight);
        this.graphics.curve(this.buffer);
    }

    onPointerMove(e: PointerEvent): void {}
    onFrameUpdate(): void {}
}
