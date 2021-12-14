import React, { ReactElement } from "react";
import Reflux from "reflux";
import { RouteProps } from "react-router-dom";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import BoardStore, { BoardActions } from "../stores/BoardStore";
import app from "../core/app";

export default class BoardPage extends Reflux.Component {
    constructor(props : RouteProps) {
        super(props);
        this.state = {
            started: false,
        };
        this.store = BoardStore;
    }

    componentDidMount() : void {
        const { id } = this.props.match.params;

        app.start(id);
        BoardActions.setBoardId(id);
    }

    render() : ReactElement {
        return (
            <>
                <Canvas />
                <div className="ui">
                    <Toolbar />
                </div>
            </>
        );
    }
}
