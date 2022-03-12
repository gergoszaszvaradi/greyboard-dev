import { mdiVectorLine } from "@mdi/js";
import { BoardItem } from "../../../../common/core/board";
import Rect from "../../../../common/utils/geometry/rect";
import { Toolbox, ToolCategory } from "../../services/toolbox";
import Graphics from "../../services/graphics";
import Viewport from "../../services/viewport";
import ClientBoard from "../../services/board";
import ShapeTool from "./shape";
import ClientBoardPath from "../../board/path";

export default class Line extends ShapeTool {
    constructor(
        protected readonly graphics : Graphics,
        protected readonly viewport : Viewport,
        protected readonly toolbox : Toolbox,
        protected readonly board : ClientBoard,
        public name = "Line",
        public category = ToolCategory.Shapes,
        public icon = mdiVectorLine,
        public shortcut = { key: "l" },
    ) {
        super(graphics, viewport, toolbox, board, name, category, icon, shortcut);
    }

    onDraw() : void {
        if (!this.toolbox.isActionStarted)
            return;

        this.graphics.stroke(this.toolbox.selectedColor, this.toolbox.selectedWeight);
        this.graphics.line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    protected createShape(rect: Rect): BoardItem | null {
        const path = new ClientBoardPath(this.graphics, "", [this.start, this.end], this.toolbox.selectedColor, this.toolbox.selectedWeight);
        path.calculateRect();
        path.normalize();
        return path;
    }
}
