import React, { ReactElement } from "react";

import styles from "./ToolbarText.module.scss";

interface ToolbarTextProps {
    width?: number;
}

const ToolbarText : React.FC<ToolbarTextProps> = ({ width, children }) : ReactElement => (
    <span className={styles.toolbarText} style={{ width, textAlign: width ? "center" : "left" }}>{children}</span>
);
ToolbarText.defaultProps = {
    width: undefined,
};
export default ToolbarText;
