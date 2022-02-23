import { ImplementationFor } from "../../../../common/core/di";
import Color from "../../../../common/utils/color";
import Point from "../../../../common/utils/geometry/point";
import Rect from "../../../../common/utils/geometry/rect";
import Graphics from "../graphics";
import Viewport from "../viewport";

// const isWebGL2Supported = () : boolean => !!document.createElement("canvas").getContext("webgl2");

@ImplementationFor(Graphics, () => false)
// eslint does not recognize classes used in decorators.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class WebGL2Graphics extends Graphics {
    private gl : WebGL2RenderingContext | null = null;

    constructor(
        protected readonly viewport : Viewport,
    ) {
        super(viewport);
    }

    getContext() : void {
        if (this.canvas)
            this.gl = this.canvas.getContext("webgl2");
    }

    stroke(color : Color, weight = 0) : void {}

    fill(color : Color) : void {}

    dash(segments : number[]) : void {}

    font(family : string, size : number, halign = "left", valign = "top") : void {}

    clear() : void {}

    rect(x : number, y : number, w : number, h : number, filled = false) : void {}

    ellipse(x : number, y : number, w : number, h : number, filled = false) : void {}

    line(x1 : number, y1 : number, x2 : number, y2 : number) : void {}

    curve(points : Point[]) : void {}

    path(points : Array<Point>, rect : Rect) : void {}

    polygon(points : Point[]) : void {}

    img(x : number, y : number, w : number, h : number, src : string | CanvasImageSource) : void {}

    text(x : number, y : number, text : string) : void {}
}
