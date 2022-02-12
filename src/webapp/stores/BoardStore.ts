import Reflux from "reflux";
import Size from "../../common/utils/geometry/size";
import app from "../core/app";
import createRefluxActions from "../utils/reflux";

export const BoardActions = createRefluxActions(class {
    setBoardId(id : string) : void {}
    setBoardSize(size : Size) : void {}
});

export default class BoardStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            id: "",
            size: new Size(0, 0),
        };
        this.listenables = BoardActions;

        app.onResize.add((size) => this.onSetBoardSize(size));
    }

    onSetBoardId(id : string) : void {
        this.setState({ ...this.state, id });
    }

    onSetBoardSize(size : Size) : void {
        this.setState({ ...this.state, size });
    }
}
