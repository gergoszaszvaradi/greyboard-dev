import { mdiEllipseOutline } from "@mdi/js";
import { BoardItem } from "../../../../common/core/board";
import Rect from "../../../../common/utils/geometry/rect";
import { Toolbox, ToolCategory } from "../../services/toolbox";
import Graphics from "../../services/graphics";
import Viewport from "../../services/viewport";
import ClientBoard from "../../services/board";
import ShapeTool from "./shape";
import ClientBoardEllipse from "../../board/ellipse";

export default class Ellipse extends ShapeTool {
    constructor(
        protected readonly graphics : Graphics,
        protected readonly viewport : Viewport,
        protected readonly toolbox : Toolbox,
        protected readonly board : ClientBoard,
        public name = "Ellipse",
        public category = ToolCategory.Shapes,
        public icon = mdiEllipseOutline,
        public shortcut = { key: "c" },
    ) {
        super(graphics, viewport, toolbox, board, name, category, icon, shortcut);
    }

    onDraw() : void {
        if (!this.toolbox.isActionStarted)
            return;

        this.graphics.stroke(this.toolbox.selectedColor, this.toolbox.selectedWeight);
        this.graphics.ellipse(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y, false);
    }

    protected createShape(rect: Rect): BoardItem | null {
        return new ClientBoardEllipse(this.graphics, "", rect, this.toolbox.selectedColor, this.toolbox.selectedWeight, false);
    }
}
