import { mdiPencil } from "@mdi/js";
import { clear } from "../../../common/utils/array";
import { Tool } from "../tool";
import Point from "../../../common/utils/geometry/point";
import app from "../app";
import { PointerEvent } from "../services/input";
import ClientBoardPath from "../board/path";
import Id from "../../../common/utils/id";
import { Inject } from "../service";
import Graphics from "../services/graphics";
import Viewport from "../services/viewport";

export default class Pencil implements Tool {
    @Inject(Graphics)
    private readonly graphics! : Graphics;

    @Inject(Viewport)
    private readonly viewport! : Viewport;

    private readonly buffer : Point[] = [];

    constructor(
        public name = "Pencil",
        public category = null,
        public icon = mdiPencil,
        public shortcut = { key: "p" },
    ) {}

    onSelected() : void {
        clear(this.buffer);
    }

    onDeselected() : void {
        clear(this.buffer);
    }

    onActionStart(e : PointerEvent) : void {
        clear(this.buffer);
        this.buffer.push(this.viewport.screenToViewport(e.getPosition()));
    }

    onPointerMove(e : PointerEvent) : void {

    }

    onActionPointerMove(e : PointerEvent) : void {
        this.buffer.push(this.viewport.screenToViewport(e.getPosition()));
    }

    onFrameUpdate() : void {
        // throw new Error("Method not implemented.");
    }

    onActionEnd(e : PointerEvent) : void {
        if (this.buffer.length === 0)
            return;

        // todo: create item with network id
        const path = new ClientBoardPath(new Id(), this.buffer, app.toolbox.selectedColor, app.toolbox.selectedWeight);
        path.optimize();
        path.calculateRect();
        path.normalize();

        app.board.add([path]);
        clear(this.buffer);
    }

    onDraw() : void {
        if (this.buffer.length === 0)
            return;
        this.graphics.stroke(app.toolbox.selectedColor, app.toolbox.selectedWeight);
        this.graphics.curve(this.buffer);
    }
}
