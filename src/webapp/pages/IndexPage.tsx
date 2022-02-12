import React, { Component, ReactElement } from "react";
import Button from "../components/controls/Button";
import Logger from "../../common/utils/logger";
import Title from "../components/typography/Title";

export default class IndexPage extends Component {
    render() : ReactElement {
        return (
            <div className="container">
                <Title>Greyboard</Title>
                <div className="flex h h-center v-center">
                    <Button primary size="big" to="/b/0000000000">Start with a fresh board</Button>
                    <div className="button-divider">or</div>
                    <Button size="big" onClick={() : void => Logger.info("clicked")}>Load an existing board</Button>
                </div>
            </div>
        );
    }
}
