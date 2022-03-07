import React, { ReactElement } from "react";
import Input, { EventActionState } from "../core/services/input";
import { BoardStore } from "../stores/BoardStore";
import { useGlobalEventListener, useInjectable } from "../utils/hooks";
import { useStore } from "../utils/flux";
import { px } from "../utils/format";

const Canvas : React.FC = () : ReactElement => {
    const board = useStore(BoardStore);
    const input = useInjectable<Input>(Input);

    useGlobalEventListener("keydown", (e) => input.processKeyEvent(e, EventActionState.Pressed));
    useGlobalEventListener("keyup", (e) => input.processKeyEvent(e, EventActionState.Released));

    return (
        <canvas
            style={{
                width: px(board.size.width),
                height: px(board.size.height),
            }}
            width={board.size.width}
            height={board.size.height}
            onMouseDown={(e) : void => input.processMouseEvent(e.nativeEvent, EventActionState.Pressed)}
            onTouchStart={(e) : void => input.processTouchEvent(e.nativeEvent, EventActionState.Pressed)}
            onMouseMove={(e) : void => input.processMouseEvent(e.nativeEvent, EventActionState.Moved)}
            onTouchMove={(e) : void => input.processTouchEvent(e.nativeEvent, EventActionState.Moved)}
            onMouseUp={(e) : void => input.processMouseEvent(e.nativeEvent, EventActionState.Released)}
            onTouchEnd={(e) : void => input.processTouchEvent(e.nativeEvent, EventActionState.Released)}
            onWheel={(e) : void => input.processMouseEvent(e.nativeEvent, EventActionState.Pressed)}
            onKeyDown={(e) : void => input.processKeyEvent(e.nativeEvent, EventActionState.Pressed)}
            onKeyUp={(e) : void => input.processKeyEvent(e.nativeEvent, EventActionState.Released)}
        />
    );
};
export default Canvas;
