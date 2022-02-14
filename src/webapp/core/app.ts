import Size from "../../common/utils/geometry/size";
import createDelegate from "../../common/utils/delegate";
import Graphics from "./services/graphics";
import { Toolbox } from "./tool";
import ClientBoard from "./board";
import Input, {
    EventActionState, KeyEvent, MouseButton, PointerEvent,
} from "./services/input";
import { Inject } from "./service";

class Application {
    @Inject(Graphics)
    private readonly graphics! : Graphics;

    @Inject(Input)
    private readonly input! : Input;

    public id : string | null = null;
    public size = new Size();
    public board = new ClientBoard();

    public toolbox = new Toolbox();
    public onResize = createDelegate<[size: Size]>();

    start(id : string) : void {
        this.id = id;
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;

        this.input.start();
        this.toolbox.tools.forEach((tool) => this.input.registerShortcut(tool.shortcut));

        this.graphics.start();
        this.graphics.onRender.add(() => {
            this.board.draw();
            this.toolbox.selectedTool.onFrameUpdate();
            this.toolbox.selectedTool.onDraw();
        });

        window.addEventListener("resize", () => this.resize(window.innerWidth, window.innerHeight));
        this.onResize(this.size);
    }

    stop() : void {
        // unbind registered events

        this.input.clear();
        this.graphics.stop();
        this.board.clear();
        this.onResize.clear();
    }

    resize(width : number, height : number) : void {
        this.size.width = width;
        this.size.height = height;
        this.onResize(this.size);
    }

    pointerDown(e : MouseEvent | TouchEvent) : void {
        e.preventDefault();
        const event = new PointerEvent(e, EventActionState.Pressed);
        this.input.pointerEventInlet(event);
        if (this.input.isMouseButtonPressed(MouseButton.Left)) {
            this.toolbox.selectedTool.onActionStart(event);
        } else {
            // this.graphics.viewport.pan()
        }
    }

    pointerMove(e : MouseEvent | TouchEvent) : void {
        e.preventDefault();
        const event = new PointerEvent(e, EventActionState.None);
        this.input.pointerEventInlet(event);
        this.toolbox.selectedTool.onPointerMove(event);
        if (this.input.isMouseButtonPressed(MouseButton.Left))
            this.toolbox.selectedTool.onActionPointerMove(event);
    }

    pointerUp(e : MouseEvent | TouchEvent) : void {
        e.preventDefault();
        const event = new PointerEvent(e, EventActionState.Released);
        this.input.pointerEventInlet(event);
        this.toolbox.selectedTool.onActionEnd(event);
    }

    keyDown(e : KeyboardEvent) : void {
        e.preventDefault();
        const event = new KeyEvent(e, EventActionState.Pressed);
        this.input.keyEventInlet(event);
    }

    keyUp(e : KeyboardEvent) : void {
        e.preventDefault();
        const event = new KeyEvent(e, EventActionState.Released);
        this.input.keyEventInlet(event);
    }
}

const app = new Application();
export default app;
