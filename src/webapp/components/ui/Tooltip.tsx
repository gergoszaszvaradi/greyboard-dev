import Icon from "@mdi/react";
import React, { ReactElement } from "react";

import "./Tooltip.scss";

interface TooltipProps {
    text: string,
    shortcut?: string,
    orientation?: "bottom" | "right",
}

const Tooltip : React.FC<TooltipProps> = ({ text, shortcut, orientation }) : ReactElement => {
    return (
        <div className={`tooltip ${orientation}`}>
            <span>{text}</span>
            {shortcut && <div className="tooltip-shortcut">{shortcut}</div>}
        </div>
    );
};
Tooltip.defaultProps = {
    shortcut: undefined,
    orientation: "right",
};
export default Tooltip;
