import { mdiRectangleOutline } from "@mdi/js";
import { BoardItem } from "../../../../common/core/board";
import Rect from "../../../../common/utils/geometry/rect";
import { Toolbox, ToolCategory } from "../../services/toolbox";
import Graphics from "../../services/graphics";
import Viewport from "../../services/viewport";
import ClientBoard from "../../services/board";
import ShapeTool from "./shape";
import ClientBoardRectangle from "../../board/rectangle";

export default class Rectangle extends ShapeTool {
    constructor(
        protected readonly graphics : Graphics,
        protected readonly viewport : Viewport,
        protected readonly toolbox : Toolbox,
        protected readonly board : ClientBoard,
        public name = "Rectangle",
        public category = ToolCategory.Shapes,
        public icon = mdiRectangleOutline,
        public shortcut = { key: "r" },
    ) {
        super(graphics, viewport, toolbox, board, name, category, icon, shortcut);
    }

    onDraw() : void {
        if (!this.toolbox.isActionStarted)
            return;

        this.graphics.stroke(this.toolbox.selectedColor, this.toolbox.selectedWeight);
        this.graphics.rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y, false);
    }

    protected createShape(rect: Rect): BoardItem | null {
        return new ClientBoardRectangle(this.graphics, "", rect, this.toolbox.selectedColor, this.toolbox.selectedWeight, false);
    }
}
