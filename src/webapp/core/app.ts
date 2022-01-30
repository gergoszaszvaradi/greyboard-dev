import Size from "../../common/utils/size";
import createDelegate from "../../common/utils/delegate";
import Graphics from "./graphics";
import Point from "../../common/utils/point";
import { Toolbox } from "./tool";

export enum KeyModifiers {
    None = 0,
    Alt = 1,
    Control = 2,
    Meta = 3,
    Shift = 4,
}

export class PointerEvent {
    position : Point = new Point();
    prevPosition : Point = new Point();
    modifiers : KeyModifiers;

    constructor(e : MouseEvent | TouchEvent) {
        if (e instanceof MouseEvent) {
            this.prevPosition = new Point(e.pageX - e.movementX, e.pageY - e.movementY);
            this.position = new Point(e.pageX, e.pageY);
        }
        this.modifiers = KeyModifiers.None;
        if (e.altKey) this.modifiers |= KeyModifiers.Alt;
        if (e.ctrlKey) this.modifiers |= KeyModifiers.Control;
        if (e.metaKey) this.modifiers |= KeyModifiers.Meta;
        if (e.shiftKey) this.modifiers |= KeyModifiers.Shift;
    }
}

export interface Shortcut {
    key : string;
    modifiers? : KeyModifiers;
}
export function shortcutAsString(shortcut : Shortcut) : string {
    const parts = [];
    if (shortcut.modifiers) {
        if (shortcut.modifiers & KeyModifiers.Control) parts.push("CTRL");
        if (shortcut.modifiers & KeyModifiers.Shift) parts.push("SHIFT");
        if (shortcut.modifiers & KeyModifiers.Alt) parts.push("ALT");
    }
    parts.push(shortcut.key.toUpperCase());
    return parts.join(" + ");
}

class Application {
    public id : string | null = null;
    public size = new Size();
    public graphics = new Graphics();
    public toolbox = new Toolbox();

    public onResize = createDelegate<[size: Size]>();

    start(id : string) : void {
        this.id = id;
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;

        this.graphics.start();
        this.graphics.onRender.add(() => this.toolbox.selectedTool.onFrameUpdate());

        window.addEventListener("resize", () => this.resize(window.innerWidth, window.innerHeight));
        this.onResize(this.size);
    }

    stop() : void {
        // unbind registered events
        this.onResize.clear();
        this.graphics.stop();
    }

    resize(width : number, height : number) : void {
        this.size.width = width;
        this.size.height = height;
        this.onResize(this.size);
    }

    pointerDown(e : MouseEvent | TouchEvent) : void {
        this.toolbox.selectedTool.onActionStart(new PointerEvent(e));
    }

    pointerMove(e : MouseEvent | TouchEvent) : void {
        this.toolbox.selectedTool.onPointerMove(new PointerEvent(e));
    }

    pointerUp(e : MouseEvent | TouchEvent) : void {
        this.toolbox.selectedTool.onActionEnd(new PointerEvent(e));
    }
}

const app = new Application();
export default app;
