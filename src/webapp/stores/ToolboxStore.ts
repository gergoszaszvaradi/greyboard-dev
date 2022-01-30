import Reflux from "reflux";
import app from "../core/app";
import { Tool } from "../core/tool";
import { createRefluxActions } from "../utils/reflux";

export const ToolboxActions = createRefluxActions(class {
    setSelectedTool(tool : Tool) : void {}
});

export default class ToolboxStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            selectedTool: null,
        };
        this.listenables = ToolboxActions;

        app.toolbox.onToolSelected.add((tool) => this.onSetSelectedTool(tool));
    }

    onSetSelectedTool(tool : Tool) : void {
        this.setState({ ...this.state, selectedTool: tool });
    }
}
