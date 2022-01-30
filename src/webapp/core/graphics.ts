import Viewport from "./viewport";
import createDelegate from "../../common/utils/delegate";

export default class Graphics {
    public viewport = new Viewport();

    private canvas : HTMLCanvasElement | null = null;
    private ctx : CanvasRenderingContext2D | null = null;
    private inUse = false;

    public onRender = createDelegate<[]>();

    start() : void {
        this.canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.inUse = true;
        this.viewport.reset();

        this.onAnimationFrame();
    }

    stop() : void {
        this.canvas = null;
        this.ctx = null;
        this.inUse = false;
        this.onRender.clear();
    }

    private onAnimationFrame() : void {
        if (!this.inUse) return;
        this.onRender();
        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
}
