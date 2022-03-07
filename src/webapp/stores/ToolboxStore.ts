import { Container } from "../../common/core/di";
import { Tool, Toolbox } from "../core/services/toolbox";
import { createActions, createStore } from "../utils/flux";

interface ToolboxState {
    tools : Tool[];
    colors : number[];
    selectedTool: Tool | null;
    selectedColor : number;
    selectedColorIndex: number;
    selectedWeight: number | null;
}

export const ToolboxStore = createStore<ToolboxState>({
    tools: [],
    colors: [],
    selectedTool: null,
    selectedColor: 0,
    selectedColorIndex: 0,
    selectedWeight: null,
});

class ToolboxActions {
    private readonly toolbox : Toolbox;
    constructor() {
        this.toolbox = Container.get<Toolbox>(Toolbox);
        this.toolbox.onToolSelected.add((tool) => ToolboxStore.setState({ ...ToolboxStore.state, selectedTool: tool }));
        this.toolbox.onColorSelected.add((color, index) => ToolboxStore.setState({ ...ToolboxStore.state, selectedColor: color, selectedColorIndex: index }));
        this.toolbox.onWeightSelected.add((weight) => ToolboxStore.setState({ ...ToolboxStore.state, selectedWeight: weight }));
        ToolboxStore.setState({
            tools: this.toolbox.tools,
            colors: this.toolbox.colors,
            selectedTool: this.toolbox.selectedTool,
            selectedColor: this.toolbox.selectedColor,
            selectedColorIndex: this.toolbox.selectedColorIndex,
            selectedWeight: this.toolbox.selectedWeight,
        });
    }

    setSelectedTool(tool : Tool) : void {
        this.toolbox.selectTool(tool);
        ToolboxStore.setState({ ...ToolboxStore.state, selectedTool: tool });
    }

    setSelectedColor(index : number) : void {
        this.toolbox.selectColor(index);
        ToolboxStore.setState({ ...ToolboxStore.state, selectedColorIndex: index, selectedColor: this.toolbox.selectedColor });
    }

    setColor(color : number) : void {
        this.toolbox.setColor(color);
        ToolboxStore.setState({ ...ToolboxStore.state, selectedColorIndex: this.toolbox.selectedColorIndex, selectedColor: this.toolbox.selectedColor });
    }

    setSelectedWeight(weight : number) : void {
        this.toolbox.selectWeight(weight);
        ToolboxStore.setState({ ...ToolboxStore.state, selectedWeight: weight });
    }
}
export const ToolboxAction = createActions<ToolboxActions, ToolboxState>(ToolboxActions, ToolboxStore);
