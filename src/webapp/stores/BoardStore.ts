import { Container } from "../../common/core/di";
import Size from "../../common/utils/geometry/size";
import app from "../core/app";
import Viewport from "../core/services/viewport";
import { createActions, createStore } from "../utils/flux";

interface BoardState {
    id : string;
    size : Size;
    viewportScale : number;
}

export const BoardStore = createStore<BoardState>({
    id: "",
    size: new Size(0, 0),
    viewportScale: 100,
});

class BoardActions {
    private readonly viewport : Viewport;
    constructor() {
        this.viewport = Container.get<Viewport>(Viewport);

        app.onResize.add((size) => this.setBoardSize(size));
        this.viewport.onScaleChanged.add((scale) => {
            this.setBoardViewportScale(Math.round(scale * 100));
        });
    }

    setBoardId(id : string) : void {
        BoardStore.setState({ ...BoardStore.state, id });
    }

    setBoardSize(size : Size) : void {
        BoardStore.setState({ ...BoardStore.state, size });
    }

    setBoardViewportScale(scale : number) : void {
        BoardStore.setState({ ...BoardStore.state, viewportScale: scale });
    }
}
export const BoardAction = createActions<BoardActions, BoardState>(BoardActions, BoardStore);
