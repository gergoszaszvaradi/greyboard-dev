import Size from "../../common/utils/size";
import createDelegate from "../../common/utils/delegate";
import createAction from "../../common/utils/action";
import Graphics from "./graphics";

class Application {
    public id : string | null = null;
    public size = new Size();
    public graphics = new Graphics();

    public onResize = createDelegate<[size: Size]>();

    public pointerDown = createAction<[e: MouseEvent | TouchEvent]>((e) => this.onPointerDown(e));
    public pointerMove = createAction<[e: MouseEvent | TouchEvent]>((e) => this.onPointerMove(e));
    public pointerUp = createAction<[e: MouseEvent | TouchEvent]>((e) => this.onPointerUp(e));

    start(id : string) : void {
        this.id = id;
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;

        this.graphics.init();

        window.addEventListener("resize", () => this.resize(window.innerWidth, window.innerHeight));
        this.onResize(this.size);
    }

    stop() : void {
        // unbind registered events
        this.onResize.clear();
        this.graphics.dispose();
    }

    resize(width : number, height : number) : void {
        this.size.width = width;
        this.size.height = height;
        this.onResize(this.size);
    }

    onPointerDown(e : MouseEvent | TouchEvent) : void {}
    onPointerMove(e : MouseEvent | TouchEvent) : void {}
    onPointerUp(e : MouseEvent | TouchEvent) : void {}
}

const app = new Application();
export default app;
