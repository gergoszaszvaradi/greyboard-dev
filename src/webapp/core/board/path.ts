import BoardPath from "../../../common/core/board/path";
import app from "../app";

export default class ClientBoardPath extends BoardPath {
    draw() : void {
        app.graphics.stroke(this.color, this.weight);
        app.graphics.path(this.points, this.rect);
    }
}
