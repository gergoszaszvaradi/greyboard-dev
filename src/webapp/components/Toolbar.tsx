import React, { ReactElement } from "react";
import { mdiSelection } from "@mdi/js";
import ToolbarButton from "./ToolbarButton";

import "./Toolbar.scss";

const Toolbar : React.FC = () : ReactElement => {
    return (
        <div className="toolbar">
            <ToolbarButton icon={mdiSelection} />
        </div>
    );
};
export default Toolbar;
