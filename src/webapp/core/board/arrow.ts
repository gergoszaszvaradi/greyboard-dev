import BoardArrow from "../../../common/core/board/arrow";
import { angleInRadians } from "../../../common/utils/geometry/geometry";
import Point from "../../../common/utils/geometry/point";
import Graphics from "../services/graphics";

export default class ClientBoardArrow extends BoardArrow {
    constructor(
        private readonly graphics : Graphics,
        createdBy : string, public points : Point[] = [], public color : number, public weight : number = 2,
    ) {
        super(createdBy, points, color, weight);
    }

    draw() : void {
        const startIndex = this.points.length > 2 ? 2 : 1;
        const start = new Point(this.rect.x + this.points[startIndex].x * this.rect.w, this.rect.y + this.points[startIndex].y * this.rect.h);
        const end = new Point(this.rect.x + this.points[0].x * this.rect.w, this.rect.y + this.points[0].y * this.rect.h);
        const a = -angleInRadians(start, end);
        const tip1 = new Point(Math.cos(a + Math.PI * 0.8) * this.weight * 5 + end.x, Math.sin(a + Math.PI * 0.8) * this.weight * 5 + end.y);
        const tip2 = new Point(Math.cos(a - Math.PI * 0.8) * this.weight * 5 + end.x, Math.sin(a - Math.PI * 0.8) * this.weight * 5 + end.y);

        this.graphics.stroke(this.color, this.weight);
        this.graphics.path(this.points, this.rect);
        this.graphics.line(end.x, end.y, tip1.x, tip1.y);
        this.graphics.line(end.x, end.y, tip2.x, tip2.y);
    }
}
