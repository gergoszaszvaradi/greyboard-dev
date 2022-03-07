import Icon from "@mdi/react";
import React, { ReactElement } from "react";

import styles from "./ToolbarPopup.module.scss";
import { className, px } from "../../utils/format";

interface ToolbarPopupProps {
    icon: string;
    active?: boolean;
    width: number;
}

const ToolbarPopup : React.FC<ToolbarPopupProps> = ({
    icon, active, width, children,
}) : ReactElement => (
    <div className={`${styles.activator} ${className(active, styles.active)}`}>
        <Icon path={icon} size={1} />
        <div className={styles.popup}>
            <div className={styles.popupContent} style={{ "--width": px(width) } as React.CSSProperties}>
                {children}
            </div>
        </div>
    </div>
);
ToolbarPopup.defaultProps = {
    active: false,
};
export default ToolbarPopup;
