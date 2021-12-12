import React, { ReactElement } from "react";
import Reflux from "reflux";
import { RouteProps } from "react-router-dom";

export default class BoardPage extends Reflux.Component {
    constructor(props : RouteProps) {
        super(props);

        this.state = {
            id: undefined,
        };
    }

    componentDidMount() : void {
        this.setState({ ...this.state, id: this.props.match.params.id });
    }

    render() : ReactElement {
        return (
            <p>{this.state.id}</p>
        );
    }
}
