import React, { Component, ReactElement } from "react";
import Reflux from "reflux";
import BoardStore from "../stores/BoardStore";

export default class Canvas extends Reflux.Component {
    constructor(props : React.PropsWithChildren<any>) {
        super(props);
        this.state = {};
        this.store = BoardStore;
    }

    // componentDidMount(): void {}

    render() : React.ReactNode {
        return (
            <canvas width={this.state.width} height={this.state.height} />
        );
    }
}
