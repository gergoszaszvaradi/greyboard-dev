import { Container } from "../../common/core/di";
import Color from "../../common/utils/color";
import { Tool, Toolbox } from "../core/services/toolbox";
import { createActions, createStore } from "../utils/flux";

interface ToolboxState {
    tools : Tool[];
    colors : Color[];
    selectedTool: Tool | null;
    selectedColor: Color | null;
    selectedWeight: number | null;
}

export const ToolboxStore = createStore<ToolboxState>({
    tools: [],
    colors: [],
    selectedTool: null,
    selectedColor: null,
    selectedWeight: null,
});

class ToolboxActions {
    private readonly toolbox : Toolbox;
    constructor() {
        this.toolbox = Container.get<Toolbox>(Toolbox);
        this.toolbox.onToolSelected.add((tool) => this.setSelectedTool(tool));
        this.toolbox.onColorSelected.add((color) => this.setSelectedColor(color));
        this.toolbox.onWeightSelected.add((weight) => this.setSelectedWeight(weight));
        ToolboxStore.setState({
            tools: this.toolbox.tools,
            colors: this.toolbox.colors,
            selectedTool: this.toolbox.selectedTool,
            selectedColor: this.toolbox.selectedColor,
            selectedWeight: this.toolbox.selectedWeight,
        });
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
