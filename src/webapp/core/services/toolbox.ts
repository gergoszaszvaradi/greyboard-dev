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
    public colors : Color[];

    public selectedTool : Tool;
    public selectedColor : Color;
    public selectedWeight : number;

    public onToolSelected = createDelegate<[tool: Tool, prevTool? : Tool]>();
    public onColorSelected = createDelegate<[color: Color]>();
    public onWeightSelected = createDelegate<[weight: number]>();

    public isActionStarted = false;

    constructor() {
        this.colors = [
            new Color(255, 255, 255, 255),
        ];

        [this.selectedTool] = this.tools;
        [this.selectedColor] = this.colors;
        this.selectedWeight = 2;
    }

    start() : void {
        [this.selectedTool] = this.tools;
        [this.selectedColor] = this.colors;
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
        const prevTool = this.selectedTool;
        this.selectedTool = tool;
        this.selectedTool.onSelected(prevTool);
        this.onToolSelected(tool, prevTool);
    }

    selectColor(color : Color) : void {
        this.selectedColor = color;
        this.onColorSelected(color);
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
