import { mdiEllipse } from "@mdi/js";
import { BoardItem } from "../../../../common/core/board";
import Rect from "../../../../common/utils/geometry/rect";
import { Toolbox, ToolCategory } from "../../services/toolbox";
import Graphics from "../../services/graphics";
import Viewport from "../../services/viewport";
import ClientBoard from "../../services/board";
import ShapeTool from "./shape";
import ClientBoardEllipse from "../../board/ellipse";
import { KeyModifiers } from "../../services/input";

export default class FilledEllipse extends ShapeTool {
    constructor(
        protected readonly graphics : Graphics,
        protected readonly viewport : Viewport,
        protected readonly toolbox : Toolbox,
        protected readonly board : ClientBoard,
        public name = "Filled Ellipse",
        public category = ToolCategory.Shapes,
        public icon = mdiEllipse,
        public shortcut = { key: "c", modifiers: KeyModifiers.Shift },
    ) {
        super(graphics, viewport, toolbox, board, name, category, icon, shortcut);
    }

    onDraw() : void {
        if (!this.toolbox.isActionStarted)
            return;

        this.graphics.fill(this.toolbox.selectedColor);
        this.graphics.ellipse(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y, true);
    }

    protected createShape(rect: Rect): BoardItem | null {
        return new ClientBoardEllipse(this.graphics, "", rect, this.toolbox.selectedColor, this.toolbox.selectedWeight, true);
    }
}
