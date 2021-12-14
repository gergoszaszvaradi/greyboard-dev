export default class Graphics {
    private canvas : HTMLCanvasElement | null = null;
    private ctx : CanvasRenderingContext2D | null = null;

    init() : void {
        this.canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
    }

    dispose() : void {
        this.canvas = null;
        this.ctx = null;
    }
}
