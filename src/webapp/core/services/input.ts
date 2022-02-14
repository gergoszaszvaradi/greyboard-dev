import createDelegate from "../../../common/utils/delegate";
import Point from "../../../common/utils/geometry/point";
import { Injectable, Lifetime, Service } from "../service";

export enum KeyModifiers {
    None = 0,
    Alt,
    Control,
    Meta,
    Shift,
}

export enum MouseButton {
    Left,
    Middle,
    Right
}

export enum EventActionState {
    None = 0,
    Pressed,
    Released,
}

export interface Shortcut {
    key : string;
    modifiers? : KeyModifiers;
}
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

export class PointerEvent {
    public modifiers : KeyModifiers;
    public button : MouseButton = MouseButton.Left;
    private readonly positions : Point[] = [];

    constructor(e : MouseEvent | TouchEvent, public state : EventActionState) {
        if (e instanceof MouseEvent) {
            this.positions = [new Point(e.pageX, e.pageY)];
            this.button = e.button;
        } else {
            this.positions.splice(0, this.positions.length);
            for (const touch of e.touches)
                this.positions.push(new Point(touch.pageX, touch.pageY));
        }
        this.modifiers = KeyModifiers.None;
        if (e.altKey)
            this.modifiers |= KeyModifiers.Alt;
        if (e.ctrlKey)
            this.modifiers |= KeyModifiers.Control;
        if (e.metaKey)
            this.modifiers |= KeyModifiers.Meta;
        if (e.shiftKey)
            this.modifiers |= KeyModifiers.Shift;
    }

    getPositions() : Point[] {
        return this.positions;
    }

    getPosition(i = 0) : Point {
        return this.positions[i];
    }
}

export class KeyEvent {
    public key : string;
    public modifiers : KeyModifiers;
    constructor(e : KeyboardEvent, public state : EventActionState) {
        this.key = e.key;
        this.modifiers = KeyModifiers.None;
        if (e.altKey)
            this.modifiers |= KeyModifiers.Alt;
        if (e.ctrlKey)
            this.modifiers |= KeyModifiers.Control;
        if (e.metaKey)
            this.modifiers |= KeyModifiers.Meta;
        if (e.shiftKey)
            this.modifiers |= KeyModifiers.Shift;
    }
}

@Injectable(Lifetime.Transient)
export default class Input extends Service {
    public onShortcutFired = createDelegate<[shortcut: Shortcut]>();
    private readonly pressedKeys : Map<string, boolean> = new Map();
    private readonly pressedMouseButtons : Map<MouseButton, boolean> = new Map();
    private readonly shortcuts : Shortcut[] = [];

    start() : void {
        this.clear();
    }

    clear() : void {
        this.shortcuts.splice(0, this.shortcuts.length);
        this.pressedKeys.clear();
        this.pressedMouseButtons.clear();
    }

    keyEventInlet(e : KeyEvent) : void {
        this.pressedKeys.set(e.key, e.state !== EventActionState.Released);

        if (e.state === EventActionState.Released)
            for (const shortcut of this.shortcuts)
                if (e.key === shortcut.key && shortcut.modifiers === e.modifiers)
                    this.onShortcutFired(shortcut);
    }

    pointerEventInlet(e : PointerEvent) : void {
        if (e.state === EventActionState.Pressed)
            this.pressedMouseButtons.set(e.button, true);
        if (e.state === EventActionState.Released)
            this.pressedMouseButtons.set(e.button, false);
    }

    registerShortcut(shortcut : Shortcut) : void {
        this.shortcuts.push(shortcut);
    }

    isKeyPressed(key : string) : boolean {
        return this.pressedKeys.get(key) || false;
    }

    isMouseButtonPressed(button : MouseButton) : boolean {
        return this.pressedMouseButtons.get(button) || false;
    }
}
