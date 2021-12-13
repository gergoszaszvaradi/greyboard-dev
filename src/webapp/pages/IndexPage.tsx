import React, { Component, ReactElement } from "react";
import { Button } from "../components/ui/Button";
import Logger from "../../common/utils/logger";

export default class IndexPage extends Component {
    render() : ReactElement {
        return (
            <div className="container">
                <h1 className="title">Greyboard</h1>
                <div className="flex h h-center v-center">
                    <Button primary size="big" to="/b/0000000000">Start with a fresh board</Button>
                    <div className="button-divider">or</div>
                    <Button size="big" onClick={() => Logger.info("clicked")}>Load an existing board</Button>
                </div>
            </div>
        );
    }
}
