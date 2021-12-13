import React from "react";
import ReactDom from "react-dom";
import Logger, { LogLevel } from "../common/utils/logger";

import App from "./App";

Logger.init({
    logLevel: LogLevel.All,
});

ReactDom.render(<App />, document.getElementById("app"));
