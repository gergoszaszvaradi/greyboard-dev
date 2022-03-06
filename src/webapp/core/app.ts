import Size from "../../common/utils/geometry/size";
import createDelegate from "../../common/utils/delegate";
import { Container } from "../../common/core/di";
import Graphics from "./services/graphics";
import { Toolbox } from "./services/toolbox";
import ClientBoard from "./services/board";
import Input, {
    EventActionState, MouseButton,
} from "./services/input";
import Pencil from "./tools/pencil";
import Eraser from "./tools/eraser";
import View from "./tools/view";
import Viewport from "./services/viewport";

import "./services/webgl2/graphics";

class Application {
    public id : string | null = null;
    public size = new Size();
    public onResize = createDelegate<[size: Size]>();

    constructor(
        private readonly graphics : Graphics,
        private readonly input : Input,
        private readonly toolbox : Toolbox,
        private readonly board : ClientBoard,
        private readonly viewport : Viewport,
    ) {
        this.toolbox.tools = [
            new Pencil(this.graphics, this.viewport, this.toolbox, this.board),
            new Eraser(this.graphics, this.viewport),
            new View(this.viewport, this.toolbox),
        ];
        [this.toolbox.selectedTool] = this.toolbox.tools;
    }

    start(id : string) : void {
        this.id = id;
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;

        Container.start();
        this.toolbox.tools.forEach((tool) => {
            if (tool.shortcut)
                this.input.registerShortcut(tool.shortcut, () => this.toolbox.selectTool(tool));
        });

        this.graphics.onRender.add(() => {
            this.board.draw();
            this.toolbox.selectedTool.onFrameUpdate();
            this.toolbox.selectedTool.onDraw();
        });

        this.input.onPointerPressed.add((event) => {
            if (event.button === MouseButton.Primary) {
                this.toolbox.startAction(event);
            } else if (event.button === MouseButton.Auxiliary) {
                const viewTool = this.toolbox.getTool(View);
                if (viewTool) {
                    this.toolbox.selectToolWithPrevious(viewTool);
                    this.toolbox.startAction(event);
                }
            }
        });
        this.input.onPointerMoved.add((event) => {
            this.toolbox.updateAction(event);
        });
        this.input.onPointerReleased.add((event) => {
            this.toolbox.stopAction(event);
        });
        this.input.onPointerScrolled.add((event) => {
            if (event.isDeltaRelative)
                this.viewport.multiplyZoom(event.position, event.delta);
            else
                this.viewport.zoom(event.position, Math.sign(event.delta) * 0.1);
        });

        window.addEventListener("resize", () => this.resize(window.innerWidth, window.innerHeight));
        this.onResize(this.size);
    }

    stop() : void {
        Container.stop();
        this.onResize.clear();
    }

    resize(width : number, height : number) : void {
        this.size.width = width;
        this.size.height = height;
        this.onResize(this.size);
    }

    mouseEvent(e : MouseEvent, state : EventActionState) : void {
        this.input.processMouseEvent(e, state);
    }

    touchEvent(e : TouchEvent, state : EventActionState) : void {
        this.input.processTouchEvent(e, state);
    }

    keyEvent(e : KeyboardEvent, state : EventActionState) : void {
        this.input.processKeyEvent(e, state);
    }

    viewportScaled(direction : number) : void {
        this.viewport.zoom(this.viewport.getScreenRect().center, -direction * 0.3);
    }
}

const app = new Application(
    Container.get(Graphics),
    Container.get(Input),
    Container.get(Toolbox),
    Container.get(ClientBoard),
    Container.get(Viewport),
);
export default app;
