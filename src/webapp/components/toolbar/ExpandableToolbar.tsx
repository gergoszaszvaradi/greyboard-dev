import Icon from "@mdi/react";
import React, { ReactElement } from "react";
import { px } from "../../utils/format";

import styles from "./ExpandableToolbar.module.scss";

interface ExpandableToolbarProps {
    icon: string;
    expandedSize: { w : number; h : number };
    orientation?: "horizontal" | "vertical";
}

const ExpandableToolbar : React.FC<ExpandableToolbarProps> = ({
    icon, expandedSize, orientation, children,
}) : ReactElement => (
    <div className={`${styles.expandableToolbar} ${orientation ? styles[orientation] : ""}`} style={{
        "--width": px(expandedSize.w),
        "--height": px(expandedSize.h),
    } as React.CSSProperties}>
        <button className={styles.activator}>
            <Icon path={icon} size={1} />
        </button>
        <div className={styles.content}>
            {children}
        </div>
    </div>
);
ExpandableToolbar.defaultProps = {
    icon: "",
    expandedSize: { w: 0, h: 0 },
};
export default ExpandableToolbar;
