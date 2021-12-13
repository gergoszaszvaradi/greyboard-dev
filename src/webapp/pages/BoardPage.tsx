import React, { ReactElement } from "react";
import Reflux from "reflux";
import { RouteProps } from "react-router-dom";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import BoardStore, { BoardActions } from "../stores/BoardStore";

export default class BoardPage extends Reflux.Component {
    constructor(props : RouteProps) {
        super(props);
        this.store = BoardStore;
    }

    componentDidMount() : void {
        BoardActions.setBoardId(this.props.match.params.id);
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
