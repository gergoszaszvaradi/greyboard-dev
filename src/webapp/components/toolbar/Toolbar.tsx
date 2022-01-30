import React, { ReactElement } from "react";

import "./Toolbar.scss";

interface ToolbarProps {
    orientation?: "horizontal" | "vertical",
}

const Toolbar : React.FC<ToolbarProps> = ({ orientation, children }) : ReactElement => {
    return (
        <div className={`toolbar ${orientation}`}>{children}</div>
    );
};
Toolbar.defaultProps = {
    orientation: "horizontal",
};
export default Toolbar;
