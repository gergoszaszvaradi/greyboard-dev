import React, { ReactElement } from "react";

import styles from "./Toolbar.module.scss";

interface ToolbarProps {
    orientation?: "horizontal" | "vertical";
}

const Toolbar : React.FC<ToolbarProps> = ({ orientation, children }) : ReactElement => (
    <div className={`${styles.toolbar} ${orientation ? styles[orientation] : ""}`}>{children}</div>
);
Toolbar.defaultProps = {
    orientation: "horizontal",
};
export default Toolbar;
