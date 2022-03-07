import BoardEllipse from "../../../common/core/board/ellipse";
import Rect from "../../../common/utils/geometry/rect";
import Graphics from "../services/graphics";

export default class ClientBoardEllipse extends BoardEllipse {
    constructor(
        private readonly graphics : Graphics,
        createdBy : string, public rect : Rect, public color : number, public weight : number = 2, public filled : boolean = false,
    ) {
        super(createdBy, rect, color, weight, filled);
    }

    draw() : void {
        if (this.filled)
            this.graphics.fill(this.color);
        else
            this.graphics.stroke(this.color, this.weight);
        this.graphics.ellipse(this.rect.x, this.rect.y, this.rect.w, this.rect.h, this.filled);
    }
}
