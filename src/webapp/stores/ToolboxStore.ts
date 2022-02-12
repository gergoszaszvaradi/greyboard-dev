import Color from "../../common/utils/color";
import app from "../core/app";
import { Tool } from "../core/tool";
import { createActions, createStore } from "../utils/flux";

interface ToolboxState {
    selectedTool: Tool | null;
    selectedColor: Color | null;
    selectedWeight: number | null;
}

export const ToolboxStore = createStore<ToolboxState>({
    selectedTool: null,
    selectedColor: null,
    selectedWeight: null,
});

class ToolboxActions {
    constructor() {
        app.toolbox.onToolSelected.add((tool) => this.setSelectedTool(tool));
        app.toolbox.onColorSelected.add((color) => this.setSelectedColor(color));
        app.toolbox.onWeightSelected.add((weight) => this.setSelectedWeight(weight));
    }

    setSelectedTool(tool : Tool) : void {
        ToolboxStore.setState({ ...ToolboxStore.state, selectedTool: tool });
    }

    setSelectedColor(color : Color) : void {
        ToolboxStore.setState({ ...ToolboxStore.state, selectedColor: color });
    }

    setSelectedWeight(weight : number) : void {
        ToolboxStore.setState({ ...ToolboxStore.state, selectedWeight: weight });
    }
}
export const ToolboxAction = createActions<ToolboxActions, ToolboxState>(ToolboxActions, ToolboxStore);
