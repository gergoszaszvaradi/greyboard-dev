import BoardPath from "../../../common/core/board/path";
import { Inject } from "../service";
import Graphics from "../services/graphics";

export default class ClientBoardPath extends BoardPath {
    @Inject(Graphics)
    private readonly graphics! : Graphics;

    draw() : void {
        this.graphics.stroke(this.color, this.weight);
        this.graphics.path(this.points, this.rect);
    }
}
