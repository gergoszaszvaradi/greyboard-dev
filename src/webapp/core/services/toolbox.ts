import { mdiShape } from "@mdi/js";
import createDelegate from "../../../common/utils/delegate";
import Color from "../../../common/utils/color";
import { PointerEvent, Shortcut } from "./input";
import { Injectable, Lifetime, Service } from "../../../common/core/di";

export class ToolCategory {
    public static Shapes = new ToolCategory("Shapes", mdiShape);

    constructor(public name : string, public icon : string) {}
}

export interface Tool {
    name : string;
    category : ToolCategory | null;
    icon : string;
    shortcut : Shortcut | null;

    onSelected(prevTool? : Tool) : void;
    onDeselected() : void;
    onActionStart(e : PointerEvent) : void;
    onActionPointerMove(e : PointerEvent) : void;
    onActionEnd(e : PointerEvent) : void;
    onPointerMove(e : PointerEvent) : void;
    onFrameUpdate() : void;
    onDraw() : void;
}

@Injectable(Lifetime.Singleton)
export class Toolbox implements Service {
    public tools : Tool[] = [];
    public colors : number[];

    public selectedTool : Tool;
    public selectedColorIndex : number;
    public selectedWeight : number;

    public onToolSelected = createDelegate<[tool: Tool, prevTool? : Tool]>();
    public onColorSelected = createDelegate<[color: number]>();
    public onWeightSelected = createDelegate<[weight: number]>();

    public isActionStarted = false;

    constructor() {
        this.colors = [
            Color.RgbaToUint(255, 255, 255, 255),
            Color.RgbaToUint(117, 117, 117, 255),
            Color.RgbaToUint(255, 235, 59, 255),
            Color.RgbaToUint(255, 152, 0, 255),
            Color.RgbaToUint(244, 67, 54, 255),
            Color.RgbaToUint(156, 39, 176, 255),
            Color.RgbaToUint(224, 224, 224, 255),
            Color.RgbaToUint(33, 33, 33, 255),
            Color.RgbaToUint(76, 175, 80, 255),
            Color.RgbaToUint(0, 150, 136, 255),
            Color.RgbaToUint(33, 150, 243, 255),
            Color.RgbaToUint(63, 81, 181, 255),
        ];

        [this.selectedTool] = this.tools;
        this.selectedColorIndex = 0;
        this.selectedWeight = 2;
    }

    get selectedColor() : number {
        return this.colors[this.selectedColorIndex];
    }

    start() : void {
        [this.selectedTool] = this.tools;
        this.selectedColorIndex = 0;
        this.selectedWeight = 2;
    }

    stop() : void {}

    getTool<T extends Tool>(toolType : new (...args : any[]) => T) : Tool | null {
        return this.tools.find((tool) => tool instanceof toolType) || null;
    }

    getToolByName(name : string) : Tool | null {
        return this.tools.find((tool) => tool.name === name) || null;
    }

    selectTool(tool : Tool) : void {
        this.selectedTool = tool;
        this.selectedTool.onSelected();
        this.onToolSelected(tool);
    }

    selectToolWithPrevious(tool : Tool) : void {
        const prevTool = this.selectedTool;
        this.selectedTool = tool;
        this.selectedTool.onSelected(prevTool);
        this.onToolSelected(tool, prevTool);
    }

    selectColor(index : number) : void {
        this.selectedColorIndex = index;
        this.onColorSelected(this.colors[index]);
    }

    setColor(color : number) : void {
        this.colors[this.selectedColorIndex] = color;
    }

    selectWeight(weight : number) : void {
        this.selectedWeight = weight;
        this.onWeightSelected(weight);
    }

    startAction(event : PointerEvent) : void {
        this.selectedTool.onActionStart(event);
        this.isActionStarted = true;
    }

    updateAction(event : PointerEvent) : void {
        if (this.isActionStarted)
            this.selectedTool.onActionPointerMove(event);
        this.selectedTool.onPointerMove(event);
    }

    stopAction(event : PointerEvent) : void {
        this.selectedTool.onActionEnd(event);
        this.isActionStarted = false;
    }
}
