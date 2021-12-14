import React, { Component, ReactElement } from "react";
import Reflux from "reflux";
import app from "../core/app";
import BoardStore from "../stores/BoardStore";
import { px } from "../utils/format";

export default class Canvas extends Reflux.Component {
    constructor(props : React.PropsWithChildren<any>) {
        super(props);
        this.state = {};
        this.store = BoardStore;
    }

    // componentDidMount(): void {}

    render() : React.ReactNode {
        return (
            <canvas
                style={{
                    width: px(this.state.size.width),
                    height: px(this.state.size.height),
                }}
                width={this.state.size.width}
                height={this.state.size.height}
                onMouseDown={(e) => app.pointerDown(e.nativeEvent)}
                onTouchStart={(e) => app.pointerDown(e.nativeEvent)}
                onMouseMove={(e) => app.pointerMove(e.nativeEvent)}
                onTouchMove={(e) => app.pointerMove(e.nativeEvent)}
                onMouseUp={(e) => app.pointerUp(e.nativeEvent)}
                onTouchEnd={(e) => app.pointerUp(e.nativeEvent)}
            />
        );
    }
}
