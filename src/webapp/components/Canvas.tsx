import React, { ReactElement } from "react";
import app from "../core/app";
import { BoardStore } from "../stores/BoardStore";
import { useStore } from "../utils/flux";
import { px } from "../utils/format";

const Canvas : React.FC = () : ReactElement => {
    const board = useStore(BoardStore);
    return (
        <canvas
            style={{
                width: px(board.size.width),
                height: px(board.size.height),
            }}
            width={board.size.width}
            height={board.size.height}
            onMouseDown={(e) : void => app.pointerDown(e.nativeEvent)}
            onTouchStart={(e) : void => app.pointerDown(e.nativeEvent)}
            onMouseMove={(e) : void => app.pointerMove(e.nativeEvent)}
            onTouchMove={(e) : void => app.pointerMove(e.nativeEvent)}
            onMouseUp={(e) : void => app.pointerUp(e.nativeEvent)}
            onTouchEnd={(e) : void => app.pointerUp(e.nativeEvent)}
            onKeyDown={(e) : void => app.keyDown(e.nativeEvent)}
            onKeyUp={(e) : void => app.keyUp(e.nativeEvent)}
        />
    );
};
export default Canvas;
