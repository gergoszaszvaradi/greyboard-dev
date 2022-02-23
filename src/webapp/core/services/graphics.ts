import { Injectable, Lifetime, Service } from "../../../common/core/di";
import Viewport from "./viewport";
import createDelegate from "../../../common/utils/delegate";
import Point from "../../../common/utils/geometry/point";
import Rect from "../../../common/utils/geometry/rect";
import Color from "../../../common/utils/color";

@Injectable(Lifetime.Singleton)
export default class Graphics implements Service {
    public onRender = createDelegate<[]>();

    protected canvas : HTMLCanvasElement | null = null;
    protected inUse = false;
    protected readonly cachedImages : Map<string, CanvasImageSource> = new Map();

    private ctx : CanvasRenderingContext2D | null = null;

    constructor(
        protected readonly viewport : Viewport,
    ) {}

    start() : void {
        [this.canvas] = document.getElementsByTagName("canvas");
        this.getContext();
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

    getContext() : void {
        if (this.canvas)
            this.ctx = this.canvas.getContext("2d");
    }

    stroke(color : Color, weight = 0) : void {
        if (!this.ctx)
            return;

        if (weight > 0)
            this.ctx.lineWidth = weight;
        this.ctx.strokeStyle = color.toHex();
    }

    fill(color : Color) : void {
        if (!this.ctx)
            return;

        this.ctx.fillStyle = color.toHex();
    }

    dash(segments : number[]) : void {
        if (!this.ctx)
            return;

        this.ctx.setLineDash(segments);
    }

    font(family : string, size : number, halign = "left", valign = "top") : void {
        if (!this.ctx)
            return;

        this.ctx.font = `${size}px ${family}`;
        this.ctx.textAlign = halign as CanvasTextAlign;
        this.ctx.textBaseline = valign as CanvasTextBaseline;
    }

    clear() : void {
        if (!this.ctx || !this.canvas)
            return;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        this.ctx.scale(this.viewport.scale, this.viewport.scale);
        this.ctx.translate(this.viewport.position.x, this.viewport.position.y);
    }

    rect(x : number, y : number, w : number, h : number, filled = false) : void {
        if (!this.ctx)
            return;

        if (filled) {
            this.ctx.fillRect(x, y, w, h);
        } else {
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    ellipse(x : number, y : number, w : number, h : number, filled = false) : void {
        if (!this.ctx)
            return;

        this.ctx.beginPath();
        this.ctx.ellipse(x, y, w, h, 0, 0, 360);
        if (filled)
            this.ctx.fill(); else
            this.ctx.stroke();
        this.ctx.closePath();
    }

    line(x1 : number, y1 : number, x2 : number, y2 : number) : void {
        if (!this.ctx)
            return;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    curve(points : Point[]) : void {
        if (!this.ctx || points.length === 0)
            return;

        if (points.length === 1) {
            const fillstyle = this.ctx.fillStyle as string;
            this.ctx.fillStyle = this.ctx.strokeStyle;
            this.ellipse(points[0].x, points[0].y, this.ctx.lineWidth / 2, this.ctx.lineWidth / 2, true);
            this.ctx.fillStyle = fillstyle;
            return;
        }

        this.ctx.fillStyle = "#00000000";
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            const mx = p1.x + (p2.x - p1.x) * 0.5;
            const my = p1.y + (p2.y - p1.y) * 0.5;
            this.ctx.quadraticCurveTo(p1.x, p1.y, mx, my);
        }
        this.ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    path(points : Array<Point>, rect : Rect) : void {
        if (!this.ctx || points.length === 0)
            return;

        if (points.length === 1) {
            const fillstyle = this.ctx.fillStyle as string;
            this.ctx.fillStyle = this.ctx.strokeStyle;
            this.ellipse(points[0].x + rect.x, points[0].y + rect.y, this.ctx.lineWidth / 2, this.ctx.lineWidth / 2, true);
            this.ctx.fillStyle = fillstyle;
            return;
        }
        this.ctx.fillStyle = "#00000000";
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x * rect.w + rect.x, points[0].y * rect.h + rect.y);
        for (let i = 0; i < points.length - 1; i++) {
            const p1x = points[i].x * rect.w + rect.x;
            const p1y = points[i].y * rect.h + rect.y;
            const p2x = points[i + 1].x * rect.w + rect.x;
            const p2y = points[i + 1].y * rect.h + rect.y;
            const mx = p1x + (p2x - p1x) * 0.5;
            const my = p1y + (p2y - p1y) * 0.5;
            this.ctx.quadraticCurveTo(p1x, p1y, mx, my);
        }
        this.ctx.lineTo(points[points.length - 1].x * rect.w + rect.x, points[points.length - 1].y * rect.h + rect.y);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    polygon(points : Point[]) : void {
        if (!this.ctx || points.length === 0)
            return;

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++)
            this.ctx.lineTo(points[i].x, points[i].y);
        this.ctx.lineTo(points[0].x, points[0].y);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    img(x : number, y : number, w : number, h : number, src : string | CanvasImageSource) : void {
        if (!this.ctx)
            return;

        if (typeof src === "string") {
            if (!(src in this.cachedImages)) {
                const img = new Image();
                img.src = src;
                this.cachedImages.set(src, img);
            }
            const img = this.cachedImages.get(src);
            if (!img)
                return;
            this.ctx.drawImage(img, x, y, w, h);
        } else {
            this.ctx.drawImage(src, x, y, w, h);
        }
    }

    text(x : number, y : number, text : string) : void {
        if (!this.ctx)
            return;

        this.ctx.fillText(text, x, y);
    }

    getImageData() : string {
        if (!this.canvas)
            return "";

        return this.canvas.toDataURL("application/octet-stream");
    }

    private onAnimationFrame() : void {
        if (!this.inUse)
            return;
        this.clear();
        this.onRender();
        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
}
