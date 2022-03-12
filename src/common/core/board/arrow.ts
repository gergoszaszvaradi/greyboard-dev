import Point from "../../utils/geometry/point";
import { BoardItemType } from "../board";
import BoardPath from "./path";

export default class BoardArrow extends BoardPath {
    public type = BoardItemType.Arrow;

    constructor(createdBy : string, public points : Point[] = [], public color : number, public weight : number = 2) {
        super(createdBy, points, color, weight);
    }
}
