import Icon from "@mdi/react";
import React, { ReactElement } from "react";

import styles from "./ToolbarButton.module.scss";
import { className } from "../../utils/format";

interface ToolbarButtonProps {
    icon: string;
    tooltip?: React.ReactElement;
    active?: boolean;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

const ToolbarButton : React.FC<ToolbarButtonProps> = ({
    icon, tooltip, active, onClick,
}) : ReactElement => (
    <button type="button" className={`${styles.toolbarButton} ${className(active, styles.active)}`} onClick={onClick}>
        <Icon path={icon} size={0.9} />
        {tooltip}
    </button>
);
ToolbarButton.defaultProps = {
    tooltip: undefined,
    active: false,
    onClick: undefined,
};
export default ToolbarButton;
