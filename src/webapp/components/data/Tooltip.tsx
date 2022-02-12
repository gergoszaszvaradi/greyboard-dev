import React, { ReactElement } from "react";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
    text: string;
    shortcut?: string;
    orientation?: "bottom" | "right";
}

const Tooltip : React.FC<TooltipProps> = ({ text, shortcut, orientation }) : ReactElement => (
    <div className={`${styles.tooltip} ${orientation ? styles[orientation] : ""}`}>
        <span>{text}</span>
        {shortcut && <div className="tooltip-shortcut">{shortcut}</div>}
    </div>
);
Tooltip.defaultProps = {
    shortcut: undefined,
    orientation: "right",
};
export default Tooltip;
