import React, { ReactElement } from "react";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
    text: string;
    shortcut?: string;
    orientation?: "bottom" | "right" | "top" | "left";
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
