import Reflux from "reflux";
import Color from "../../common/utils/color";
import app from "../core/app";
import { Tool } from "../core/tool";
import createRefluxActions from "../utils/reflux";

export const ToolboxActions = createRefluxActions(class {
    setSelectedTool(tool : Tool) : void {}
    setSelectedColor(color : Color) : void {}
    setSelectedWeight(weight : number) : void {}
});

export default class ToolboxStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            selectedTool: null,
            selectedColor: null,
            selectedWeight: null,
        };
        this.listenables = ToolboxActions;

        app.toolbox.onToolSelected.add((tool) => this.onSetSelectedTool(tool));
        app.toolbox.onColorSelected.add((color) => this.onSetSelectedColor(color));
        app.toolbox.onWeightSelected.add((weight) => this.onSetSelectedWeight(weight));
    }

    onSetSelectedTool(tool : Tool) : void {
        this.setState({ ...this.state, selectedTool: tool });
    }

    onSetSelectedColor(color : Color) : void {
        this.setState({ ...this.state, selectedColor: color });
    }

    onSetSelectedWeight(weigth : number) : void {
        this.setState({ ...this.state, selectedWeight: weigth });
    }
}
