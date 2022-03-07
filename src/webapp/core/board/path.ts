import Point from "src/common/utils/geometry/point";
import BoardPath from "../../../common/core/board/path";
import Graphics from "../services/graphics";

export default class ClientBoardPath extends BoardPath {
    constructor(
        private readonly graphics : Graphics,
        createdBy : string, public points : Point[] = [], public color : number, public weight : number = 2,
    ) {
        super(createdBy, points, color, weight);
    }

    draw() : void {
        this.graphics.stroke(this.color, this.weight);
        this.graphics.path(this.points, this.rect);
    }
}
