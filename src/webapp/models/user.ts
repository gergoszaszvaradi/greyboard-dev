import Point from "../../common/utils/geometry/point";

export interface User {
    id : string;
    name : string;
}

export interface NetworkUser extends User {
    pointer : Point;
}
