import React, { ReactElement } from "react";

import "./ToolbarText.scss";

const ToolbarButton : React.FC = ({ children }) : ReactElement => {
    return (
        <span className="toolbar-text">{children}</span>
    );
};
export default ToolbarButton;
