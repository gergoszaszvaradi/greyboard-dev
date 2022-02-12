import Size from "../../common/utils/geometry/size";
import app from "../core/app";
import { createActions, createStore } from "../utils/flux";

interface BoardState {
    id : string;
    size : Size;
}

export const BoardStore = createStore<BoardState>({
    id: "",
    size: new Size(0, 0),
});

class BoardActions {
    constructor() {
        app.onResize.add((size) => this.setBoardSize(size));
    }

    setBoardId(id : string) : void {
        BoardStore.setState({ ...BoardStore.state, id });
    }

    setBoardSize(size : Size) : void {
        BoardStore.setState({ ...BoardStore.state, size });
    }
}
export const BoardAction = createActions<BoardActions, BoardState>(BoardActions, BoardStore);
