import React, { ReactElement } from "react";
import Reflux from "reflux";
import { RouteProps } from "react-router-dom";
import {
    mdiContentSave, mdiDelete, mdiEraser, mdiExport, mdiFormatTitle, mdiLayersOutline, mdiMinus, mdiPencil, mdiPlus, mdiRedo, mdiSelection, mdiUndo,
} from "@mdi/js";
import { groupBy } from "../../common/utils/array";
import Canvas from "../components/Canvas";
import Toolbar from "../components/toolbar/Toolbar";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import ToolbarText from "../components/toolbar/ToolbarText";
import BoardStore, { BoardActions } from "../stores/BoardStore";
import app, { shortcutAsString } from "../core/app";

import "./pages.scss";
import ToolbarInput from "../components/toolbar/ToolbarInput";
import ToolbarDivider from "../components/toolbar/ToolbarDivider";
import Tooltip from "../components/ui/Tooltip";
import BoardUsers from "../components/BoardUsers";
import { Tool, ToolCategory } from "../core/tool";
import ToolboxStore from "../stores/ToolboxStore";

export default class BoardPage extends Reflux.Component {
    public toolHierarchy : Map<ToolCategory | null, Tool[]> = new Map();

    constructor(props : RouteProps) {
        super(props);
        this.state = {
            started: false,
        };
        this.stores = [BoardStore, ToolboxStore];
    }

    componentDidMount() : void {
        const { id } = this.props.match.params;

        this.toolHierarchy = groupBy(app.toolbox.tools, (tool) => tool.category);

        app.start(id);
        BoardActions.setBoardId(id);
        BoardActions.setBoardSize(app.size);
    }

    componentWillUnmount() : void {
        app.stop();
    }

    render() : ReactElement {
        const toolBarButtonsFromTools = (tools : Tool[]) : ReactElement[] => {
            return tools.map((tool) => {
                return (
                    <ToolbarButton
                        key={tool.name}
                        active={app.toolbox.selectedTool === tool}
                        icon={tool.icon}
                        tooltip={(
                            <Tooltip
                                text={tool.name}
                                shortcut={shortcutAsString(tool.shortcut)}
                            />
                        )}
                        onClick={() => app.toolbox.select(tool)}
                    />
                );
            });
        };

        return (
            <>
                <Canvas />
                <div className="ui">
                    <div className="top-bar flex h h-spaced">
                        <Toolbar orientation="horizontal">
                            <ToolbarInput id="board-title" value="New Board" placeholder="" />
                            <ToolbarDivider orientation="vertical" />
                            <ToolbarButton icon={mdiContentSave} tooltip={<Tooltip text="Save" shortcut="CTRL + S" orientation="bottom" />} />
                            <ToolbarButton icon={mdiExport} tooltip={<Tooltip text="Export" shortcut="CTRL + E" orientation="bottom" />} />
                            <ToolbarButton icon={mdiDelete} tooltip={<Tooltip text="Clear Board" orientation="bottom" />} />
                            <ToolbarButton icon={mdiUndo} tooltip={<Tooltip text="Undo" shortcut="CTRL + Z" orientation="bottom" />} />
                            <ToolbarButton icon={mdiRedo} tooltip={<Tooltip text="Redo" shortcut="CTRL + SHIFT + Z" orientation="bottom" />} />
                        </Toolbar>
                        <BoardUsers users={[]} />
                    </div>
                    <div className="middle-bar">
                        <Toolbar orientation="vertical">
                            {Array.from(this.toolHierarchy.entries()).map(([category, tools]) => {
                                if (category) {
                                    return toolBarButtonsFromTools(tools);
                                }
                                return toolBarButtonsFromTools(tools);
                            })}
                        </Toolbar>
                    </div>
                    <div className="bottom-bar">
                        <Toolbar orientation="vertical">
                            <ToolbarButton icon={mdiPlus} tooltip={<Tooltip text="Zoom In" />} />
                            <ToolbarText>100%</ToolbarText>
                            <ToolbarButton icon={mdiMinus} tooltip={<Tooltip text="Zoom Out" />} />
                            <ToolbarButton icon={mdiLayersOutline} tooltip={<Tooltip text="Outline" />} />
                        </Toolbar>
                    </div>
                </div>
            </>
        );
    }
}
