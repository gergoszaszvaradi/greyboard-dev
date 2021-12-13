import Icon from "@mdi/react";
import React, { ReactElement } from "react";

import "./ToolbarButton.scss";

interface ToolbarButtonProps {
    icon : string;
}

const ToolbarButton : React.FC<ToolbarButtonProps> = ({ icon }) : ReactElement => {
    return (
        <button type="button" className="toolbar-button">
            <Icon path={icon} size={1} />
        </button>
    );
};
// ToolbarButton.defaultProps = {
//     icon: "",
// };
export default ToolbarButton;
