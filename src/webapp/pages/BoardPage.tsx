import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    mdiContentSave, mdiDelete, mdiExport, mdiLayersOutline, mdiMinus, mdiPalette, mdiPlus, mdiRedo, mdiUndo,
} from "@mdi/js";
import { groupBy } from "../../common/utils/array";
import Canvas from "../components/Canvas";
import Toolbar from "../components/toolbar/Toolbar";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import ToolbarText from "../components/toolbar/ToolbarText";
import app from "../core/app";
import ToolbarInput from "../components/toolbar/ToolbarInput";
import ToolbarDivider from "../components/toolbar/ToolbarDivider";
import Tooltip from "../components/data/Tooltip";
import { Tool } from "../core/services/toolbox";
import { useStore } from "../utils/flux";
import { ToolboxAction, ToolboxStore } from "../stores/ToolboxStore";
import { BoardAction, BoardStore } from "../stores/BoardStore";
import styles from "./BoardPage.module.scss";
import { shortcutAsString } from "../core/services/input";
import ExpandableToolbar from "../components/toolbar/ExpandableToolbar";
import Slider from "../components/controls/Slider";
import ToolbarColorButton from "../components/toolbar/ToolbarColorButton";
import ColorPicker from "../components/controls/ColorPicker";

interface BoardPageParams {
    id : string;
}

const BoardPage : React.FC = () : ReactElement => {
    const toolbox = useStore(ToolboxStore);
    const board = useStore(BoardStore);

    const params = useParams<BoardPageParams>();
    useEffect(() : () => void => {
        app.start(params.id);
        BoardAction.setBoardId(params.id);
        return () : void => {
            app.stop();
        };
    }, []);

    const toolHierarchy = groupBy(toolbox.tools, (tool) => tool.category);

    const toolBarButtonsFromTools = (tools : Tool[]) : ReactElement[] => tools.map((tool) => (
        <ToolbarButton
            key={tool.name}
            active={toolbox.selectedTool === tool}
            icon={tool.icon}
            tooltip={(tool.shortcut ?
                <Tooltip
                    text={tool.name}
                    shortcut={shortcutAsString(tool.shortcut)}
                /> : undefined
            )}
            onClick={() : void => ToolboxAction.setSelectedTool(tool)}
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
                    <ExpandableToolbar icon={mdiPalette} expandedSize={{ w: 280, h: 300 }}>
                        <div className="px2 pt1 pb2">
                            <Slider label="Stroke Size" min={1} max={20} step={1} startValue={2} showValue onInput={(value) : void => ToolboxAction.setSelectedWeight(value)} />
                        </div>
                        {toolbox.colors.map((color, i) => (
                            <ToolbarColorButton key={i} color={color} active={toolbox.selectedColorIndex === i} onClick={() : void => ToolboxAction.setSelectedColor(i)} />
                        ))}
                        <div className="px2 pt2">
                            <ColorPicker color={toolbox.selectedColor} onInput={(color : number) : void => ToolboxAction.setColor(color)} />
                        </div>
                    </ExpandableToolbar>
                </div>
                <div className={styles.bottomBar}>
                    <Toolbar orientation="horizontal">
                        <ToolbarButton icon={mdiLayersOutline} tooltip={<Tooltip text="Outline" orientation="top" />} />
                        <ToolbarButton icon={mdiPlus} tooltip={<Tooltip text="Zoom In" orientation="top" />} onClick={() : void => app.viewportScaled(1)} />
                        <ToolbarText width={50}>{board.viewportScale}%</ToolbarText>
                        <ToolbarButton icon={mdiMinus} tooltip={<Tooltip text="Zoom Out" orientation="top" />} onClick={() : void => app.viewportScaled(-1)} />
                    </Toolbar>
                </div>
            </div>
        </>
    );
};
export default BoardPage;
