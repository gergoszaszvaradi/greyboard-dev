import React, { ReactElement } from "react";

import "./ToolbarDivider.scss";

interface ToolbarInputProps {
    orientation?: "horizontal" | "vertical",
}

const ToolbarDivider : React.FC<ToolbarInputProps> = ({ orientation }) : ReactElement => {
    return (
        <div className={`toolbar-divider ${orientation}`} />
    );
};
ToolbarDivider.defaultProps = {
    orientation: "horizontal",
};
export default ToolbarDivider;
