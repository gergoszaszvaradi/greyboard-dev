import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    mdiContentSave, mdiDelete, mdiExport, mdiLayersOutline, mdiMinus, mdiPlus, mdiRedo, mdiUndo,
} from "@mdi/js";
import { groupBy } from "../../common/utils/array";
import Canvas from "../components/Canvas";
import Toolbar from "../components/toolbar/Toolbar";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import ToolbarText from "../components/toolbar/ToolbarText";
import app from "../core/app";
import { shortcutAsString } from "../core/input";
import ToolbarInput from "../components/toolbar/ToolbarInput";
import ToolbarDivider from "../components/toolbar/ToolbarDivider";
import Tooltip from "../components/data/Tooltip";
import { Tool } from "../core/tool";
import { useStore } from "../utils/flux";
import { ToolboxStore } from "../stores/ToolboxStore";
import { BoardAction } from "../stores/BoardStore";
import styles from "./BoardPage.module.scss";

interface BoardPageParams {
    id : string;
}

const BoardPage : React.FC = () : ReactElement => {
    const toolbox = useStore(ToolboxStore);

    const params = useParams<BoardPageParams>();
    useEffect(() : () => void => {
        app.start(params.id);
        BoardAction.setBoardId(params.id);
        return () : void => {
            app.stop();
        };
    });

    const toolHierarchy = groupBy(app.toolbox.tools, (tool) => tool.category);

    const toolBarButtonsFromTools = (tools : Tool[]) : ReactElement[] => tools.map((tool) => (
        <ToolbarButton
            key={tool.name}
            active={toolbox.selectedTool === tool}
            icon={tool.icon}
            tooltip={(
                <Tooltip
                    text={tool.name}
                    shortcut={shortcutAsString(tool.shortcut)}
                />
            )}
            onClick={() : void => app.toolbox.selectTool(tool)}
        />
    ));

    return (
        <>
            <Canvas />
            <div className={styles.ui}>
                <div className={`${styles.topBar} flex h h-spaced`}>
                    <Toolbar orientation="horizontal">
                        <ToolbarInput id="board-title" value="New Board" placeholder="" />
                        <ToolbarDivider orientation="vertical" />
                        <ToolbarButton icon={mdiContentSave} tooltip={<Tooltip text="Save" shortcut="CTRL + S" orientation="bottom" />} />
                        <ToolbarButton icon={mdiExport} tooltip={<Tooltip text="Export" shortcut="CTRL + E" orientation="bottom" />} />
                        <ToolbarButton icon={mdiDelete} tooltip={<Tooltip text="Clear Board" orientation="bottom" />} />
                        <ToolbarButton icon={mdiUndo} tooltip={<Tooltip text="Undo" shortcut="CTRL + Z" orientation="bottom" />} />
                        <ToolbarButton icon={mdiRedo} tooltip={<Tooltip text="Redo" shortcut="CTRL + SHIFT + Z" orientation="bottom" />} />
                    </Toolbar>
                </div>
                <div className={styles.middleBar}>
                    <Toolbar orientation="vertical">
                        {Array.from(toolHierarchy.entries()).map(([category, tools]) => {
                            if (category)
                                return toolBarButtonsFromTools(tools);

                            return toolBarButtonsFromTools(tools);
                        })}
                    </Toolbar>
                </div>
                <div className={styles.bottomBar}>
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
};
export default BoardPage;
