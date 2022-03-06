import React, { ReactElement } from "react";
import { className } from "../../utils/format";
import Color from "../../../common/utils/color";

import styles from "./ToolbarColorButton.module.scss";

interface ToolbarColorButtonProps {
    color: number;
    active?: boolean;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

const ToolbarColorButton : React.FC<ToolbarColorButtonProps> = ({
    color, active, onClick,
}) : ReactElement => (
    <button type="button" className={`${styles.toolbarColorButton} ${className(active, styles.active)}`} onClick={onClick}>
        <div className={styles.colorCircle} style={{ backgroundColor: Color.UIntToHex(color) }}></div>
    </button>
);
ToolbarColorButton.defaultProps = {
    active: false,
    onClick: undefined,
};
export default ToolbarColorButton;
