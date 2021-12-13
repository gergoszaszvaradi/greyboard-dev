import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import IndexPage from "./pages/IndexPage";

import "./App.scss";

export default function App() : ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/b/:id" component={BoardPage} />
                <Route path="/" component={IndexPage} />
            </Switch>
        </BrowserRouter>
    );
}
