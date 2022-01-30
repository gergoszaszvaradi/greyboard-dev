import Icon from "@mdi/react";
import React, { ReactElement } from "react";

import "./ToolbarButton.scss";
import { className } from "../../utils/format";

interface ToolbarButtonProps {
    icon: string;
    tooltip?: React.ReactElement;
    active?: boolean;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

const ToolbarButton : React.FC<ToolbarButtonProps> = ({
    icon, tooltip, active, onClick,
}) : ReactElement => {
    return (
        <button type="button" className={`toolbar-button ${className(active, "active")}`} onClick={onClick}>
            <Icon path={icon} size={0.9} />
            {tooltip}
        </button>
    );
};
ToolbarButton.defaultProps = {
    tooltip: undefined,
    active: false,
    onClick: undefined,
};
export default ToolbarButton;
