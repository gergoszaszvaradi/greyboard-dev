import { mdiShape } from "@mdi/js";
import createDelegate from "../../common/utils/delegate";
import { PointerEvent, Shortcut } from "./app";
import Eraser from "./tools/eraser";
import Pencil from "./tools/pencil";

export class ToolCategory {
    public static Shapes = new ToolCategory("Shapes", mdiShape);

    constructor(public name : string, public icon : string) {}
}

export interface Tool {
    name : string;
    category : ToolCategory | null;
    icon : string;
    shortcut : Shortcut;

    onSelected() : void;
    onDeselected() : void;
    onActionStart(e : PointerEvent) : void;
    onPointerMove(e : PointerEvent) : void;
    onFrameUpdate() : void;
    onActionEnd(e : PointerEvent) : void;
    onDraw() : void;
}

export class Toolbox {
    public tools : Tool[];
    public selectedTool : Tool;

    public onToolSelected = createDelegate<[Tool]>();

    constructor() {
        this.tools = [
            new Pencil(),
            new Eraser(),
        ];
        [this.selectedTool] = this.tools;
    }

    select(tool : Tool) : void {
        this.selectedTool = tool;
        this.onToolSelected(tool);
    }
}
