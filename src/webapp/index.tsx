import React from "react";
import ReactDom from "react-dom";
import BitFlag from "../common/utils/bitflag";
import Logger, { LogLevel } from "../common/utils/logger";

import App from "./App";

import "./assets/css/App.scss";

Logger.init({
    logLevel: new BitFlag(LogLevel.All),
});

ReactDom.render(<App />, document.getElementById("app"));
