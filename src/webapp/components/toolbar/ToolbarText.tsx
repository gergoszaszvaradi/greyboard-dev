import React, { ReactElement } from "react";

import styles from "./ToolbarText.module.scss";

const ToolbarButton : React.FC = ({ children }) : ReactElement => (
    <span className={styles.toolbarText}>{children}</span>
);
export default ToolbarButton;
