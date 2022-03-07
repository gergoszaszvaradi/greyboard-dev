import React, { ReactElement } from "react";

import styles from "./Tooltip.module.scss";

export type TooltipOrientation = "bottom" | "right" | "top" | "left";

interface TooltipProps {
    text: string;
    shortcut?: string;
    orientation?: TooltipOrientation;
}

const Tooltip : React.FC<TooltipProps> = ({ text, shortcut, orientation }) : ReactElement => (
    <div className={`${styles.tooltip} ${orientation ? styles[orientation] : ""}`}>
        <span>{text}</span>
        {shortcut && <div className={styles.tooltipShortcut}>{shortcut}</div>}
    </div>
);
Tooltip.defaultProps = {
    shortcut: undefined,
    orientation: "right",
};
export default Tooltip;
