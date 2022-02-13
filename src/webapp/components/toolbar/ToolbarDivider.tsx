import React, { ReactElement } from "react";

import styles from "./ToolbarDivider.module.scss";

interface ToolbarInputProps {
    orientation?: "horizontal" | "vertical";
}

const ToolbarDivider : React.FC<ToolbarInputProps> = ({ orientation }) : ReactElement => (
    <div className={`${styles.toolbarDivider} ${orientation ? styles[orientation] : ""}`} />
);
ToolbarDivider.defaultProps = {
    orientation: "horizontal",
};
export default ToolbarDivider;
