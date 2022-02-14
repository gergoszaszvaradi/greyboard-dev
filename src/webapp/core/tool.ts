import { mdiShape } from "@mdi/js";
import createDelegate from "../../common/utils/delegate";
import Color from "../../common/utils/color";
import { PointerEvent, Shortcut } from "./services/input";
import Eraser from "./tools/eraser";
import Pencil from "./tools/pencil";
import View from "./tools/view";

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
    onActionPointerMove(e : PointerEvent) : void;
    onActionEnd(e : PointerEvent) : void;
    onPointerMove(e : PointerEvent) : void;
    onFrameUpdate() : void;
    onDraw() : void;
}

export class Toolbox {
    public tools : Tool[];
    public colors : Color[];

    public selectedTool : Tool;
    public selectedColor : Color;
    public selectedWeight : number;

    public onToolSelected = createDelegate<[tool: Tool]>();
    public onColorSelected = createDelegate<[color: Color]>();
    public onWeightSelected = createDelegate<[weight: number]>();

    constructor() {
        this.tools = [
            new Pencil(),
            new Eraser(),
            new View(),
        ];
        this.colors = [
            new Color(255, 255, 255, 255),
        ];

        [this.selectedTool] = this.tools;
        [this.selectedColor] = this.colors;
        this.selectedWeight = 2;
    }

    selectTool(tool : Tool) : void {
        this.selectedTool = tool;
        this.onToolSelected(tool);
    }

    selectColor(color : Color) : void {
        this.selectedColor = color;
        this.onColorSelected(color);
    }

    selectWeight(weight : number) : void {
        this.selectedWeight = weight;
        this.onWeightSelected(weight);
    }
}
