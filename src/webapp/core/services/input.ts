import { distSq } from "../../../common/utils/geometry/geometry";
import { clear, copy } from "../../../common/utils/array";
import createDelegate from "../../../common/utils/delegate";
import Point from "../../../common/utils/geometry/point";
import { Injectable, Lifetime, Service } from "../../../common/core/di";

export enum KeyModifiers {
    None = 0,
    Alt = 1,
    Control = 2,
    Meta = 4,
    Shift = 8,
}

export enum MouseButton {
    Primary,
    Auxiliary,
    Secondary,
}

export enum EventActionState {
    Pressed,
    Moved,
    Released,
}

export interface Shortcut {
    key : string;
    modifiers? : KeyModifiers;
}
type ShortcutWithActions = Shortcut & { action: () => void };
export function shortcutAsString(shortcut : Shortcut) : string {
    const parts = [];
    if (shortcut.modifiers) {
        if (shortcut.modifiers & KeyModifiers.Control)
            parts.push("CTRL");
        if (shortcut.modifiers & KeyModifiers.Shift)
            parts.push("SHIFT");
        if (shortcut.modifiers & KeyModifiers.Alt)
            parts.push("ALT");
    }
    parts.push(shortcut.key.toUpperCase());
    return parts.join(" + ");
}

export class KeyEvent {
    constructor(
        public key : string,
        public modifiers : KeyModifiers,
    ) {}
}

export class PointerEvent {
    constructor(
        public button : MouseButton,
        public modifiers : KeyModifiers,
        public positions : Point[],
        public prevPositions : Point[],
        public delta : number,
        public isDeltaRelative : boolean,
    ) {}

    get position() : Point { return Point.mid(...this.positions); }
    get prevPosition() : Point { return Point.mid(...this.prevPositions); }
    get movement() : Point {
        const p = this.position;
        const pp = this.prevPosition;
        return new Point(pp.x - p.x, pp.y - p.y);
    }
}

@Injectable(Lifetime.Singleton)
export default class Input implements Service {
    public onKeyPressed = createDelegate<[event: KeyEvent]>();
    public onKeyReleased = createDelegate<[event: KeyEvent]>();

    public onPointerPressed = createDelegate<[event: PointerEvent]>();
    public onPointerMoved = createDelegate<[event: PointerEvent]>();
    public onPointerReleased = createDelegate<[event: PointerEvent]>();
    public onPointerScrolled = createDelegate<[event: PointerEvent]>();

    public onShortcutFired = createDelegate<[shortcut: Shortcut]>();

    public pointerPosition = new Point();
    public pointerPrevPosition = new Point();

    private readonly pressedKeys = new Map<string, boolean>();
    private readonly pressedMouseButtons = new Map<MouseButton, boolean>();
    private prevTouchPositions : Point[] = [];
    private readonly shortcuts : ShortcutWithActions[] = [];

    get pointerMovement() : Point {
        return new Point(this.pointerPrevPosition.x - this.pointerPosition.x, this.pointerPrevPosition.y - this.pointerPosition.y);
    }

    start() : void {}
    stop() : void {
        this.onKeyPressed.clear();
        this.onKeyReleased.clear();
        this.onPointerPressed.clear();
        this.onPointerMoved.clear();
        this.onPointerReleased.clear();
        this.onPointerScrolled.clear();
        this.onShortcutFired.clear();
        this.pressedKeys.clear();
        this.pressedMouseButtons.clear();
        clear(this.prevTouchPositions);
        clear(this.shortcuts);
    }

    registerShortcut(shortcut : Shortcut, action : () => void) : void {
        this.shortcuts.push({
            ...shortcut,
            action,
        });
    }

    processKeyEvent(e : KeyboardEvent, state : EventActionState) : void {
        const event = new KeyEvent(e.key, this.getModifiersFromEvent(e));

        if (state === EventActionState.Pressed) {
            this.pressedKeys.set(event.key, true);
            this.onKeyPressed(event);
        } else if (state === EventActionState.Released) {
            this.pressedKeys.set(event.key, false);
            this.onKeyReleased(event);
        }

        if (document.activeElement?.tagName === "INPUT")
            return;

        for (const shortcut of this.shortcuts)
            if (event.key.toLowerCase() === shortcut.key.toLowerCase() && ((!shortcut.modifiers && event.modifiers === KeyModifiers.None) || event.modifiers === shortcut.modifiers)) {
                e.preventDefault();
                this.onShortcutFired(shortcut);
                shortcut.action();
                break;
            }
    }

    processMouseEvent(e : MouseEvent | WheelEvent, state : EventActionState) : void {
        e.preventDefault();

        const event : PointerEvent = new PointerEvent(
            e.button,
            this.getModifiersFromEvent(e),
            [new Point(e.clientX, e.clientY)],
            [new Point(e.clientX - e.movementX, e.clientY - e.movementY)],
            (e instanceof WheelEvent) ? e.deltaY : 0,
            false,
        );

        if (e instanceof WheelEvent) {
            this.onPointerScrolled(event);
        } else if (state === EventActionState.Pressed) {
            this.onPointerPressed(event);
            this.pressedMouseButtons.set(event.button, true);
        } else if (state === EventActionState.Moved) {
            this.pointerPosition = event.position;
            this.pointerPrevPosition = event.prevPosition;
            this.onPointerMoved(event);
        } else if (state === EventActionState.Released) {
            this.onPointerReleased(event);
            this.pressedMouseButtons.set(event.button, false);
        }
    }

    processTouchEvent(e : TouchEvent, state : EventActionState) : void {
        e.preventDefault();

        const event : PointerEvent = new PointerEvent(
            MouseButton.Primary,
            this.getModifiersFromEvent(e),
            Array.from(e.touches).map((touch) => new Point(touch.clientX, touch.clientY)),
            this.prevTouchPositions,
            0,
            true,
        );

        this.prevTouchPositions = copy(event.positions);

        if (e.touches.length > 1) {
            event.button = MouseButton.Auxiliary;
            const d = distSq(event.positions[0], event.positions[1]);
            const pd = distSq(event.prevPositions[0], event.prevPositions[1]);
            if (d !== 0 && pd !== 0 && d !== pd) {
                event.delta = d / pd;
                this.onPointerScrolled(event);
            }
        }

        if (state === EventActionState.Pressed) {
            this.onPointerPressed(event);
            this.pressedMouseButtons.set(event.button, true);
        } else if (state === EventActionState.Moved) {
            this.pointerPosition = event.position;
            this.pointerPrevPosition = event.prevPosition;
            this.onPointerMoved(event);
        } else if (state === EventActionState.Released) {
            this.onPointerReleased(event);
            this.pressedMouseButtons.set(event.button, false);
        }
    }

    isMouseButtonPressed(button : MouseButton) : boolean {
        return this.pressedMouseButtons.get(button) || false;
    }

    private getModifiersFromEvent(e : KeyboardEvent | MouseEvent | TouchEvent) : KeyModifiers {
        let modifiers = KeyModifiers.None;
        if (window.TouchEvent && e instanceof TouchEvent) {
            if (e.altKey)
                modifiers |= KeyModifiers.Alt;
            if (e.ctrlKey)
                modifiers |= KeyModifiers.Control;
            if (e.shiftKey)
                modifiers |= KeyModifiers.Shift;
            if (e.metaKey)
                modifiers |= KeyModifiers.Meta;
            return modifiers;
        }
        if (e instanceof MouseEvent || e instanceof KeyboardEvent) {
            if (e.getModifierState("Alt"))
                modifiers |= KeyModifiers.Alt;
            if (e.getModifierState("Control"))
                modifiers |= KeyModifiers.Control;
            if (e.getModifierState("Shift"))
                modifiers |= KeyModifiers.Shift;
            if (e.getModifierState("OS"))
                modifiers |= KeyModifiers.Meta;
        }

        return modifiers;
    }
}
