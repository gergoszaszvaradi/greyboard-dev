import Size from "../../common/utils/size";
import createDelegate from "../../common/utils/delegate";
import { BoardActions } from "../stores/BoardStore";
import Graphics from "./graphics";

class Application {
    public size : Size = new Size();
    // public graphics : Graphics;

    public onResize = createDelegate<[size: Size]>();

    start() : boolean {
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;

        // this.graphics = new Graphics();

        window.addEventListener("resize", () => this.resize(window.innerWidth, window.innerHeight));

        window.addEventListener("mousedown", (e) => e);

        return true;
    }

    stop() : void {}

    resize(width : number, height : number) : void {
        this.size.width = width;
        this.size.height = height;
        this.onResize(this.size);
        // BoardActions.setBoardSize(this.size);
    }
}

const app = new Application();
export default app;
