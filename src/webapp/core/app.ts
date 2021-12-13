import Size from "../../common/utils/size";
import { BoardActions } from "../stores/BoardStore";
import Graphics from "./graphics";

export default class Application {
    public size : Size;
    public graphics : Graphics;

    constructor() {
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;

        window.addEventListener("resize", () => this.resize(window.innerWidth, window.innerHeight));
    }

    resize(width : number, height : number) : void {
        this.size.width = width;
        this.size.height = height;
        BoardActions.setBoardSize(this.size);
    }
}
