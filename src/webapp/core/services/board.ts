import Board, { BoardItem } from "../../../common/core/board";
import Point from "../../../common/utils/geometry/point";
import Rect from "../../../common/utils/geometry/rect";
import { Injectable, Lifetime, Service } from "../../../common/core/di";
import Viewport from "./viewport";

@Injectable(Lifetime.Singleton)
export default class ClientBoard extends Board implements Service {
    public static BOARD_CELL_SIZE = 100;

    private readonly cells : Map<string, Set<BoardItem>> = new Map();

    constructor(
        private readonly viewport : Viewport,
    ) {
        super();
    }

    start(): void { this.clear(); }
    stop(): void { this.clear(); }

    add(items : BoardItem[]) : void {
        super.add(items);
        this.addToGrid(items);
    }

    addToGrid(items : BoardItem[]) : void {
        for (const item of items) {
            const min = this.getCellIndex(item.rect.x, item.rect.y);
            const max = this.getCellIndex(item.rect.x + item.rect.w, item.rect.y + item.rect.h);

            item.cell.min = min;
            item.cell.max = max;

            for (let { x } = min; x <= max.x; ++x)
                for (let { y } = min; y <= max.y; ++y) {
                    const key = this.hash(x, y);
                    let cell = this.cells.get(key);
                    if (!cell) {
                        cell = new Set();
                        this.cells.set(key, cell);
                    }
                    cell.add(item);
                }
        }
    }

    move(ids : Iterable<string>, dx : number, dy : number) : void {
        super.move(ids, dx, dy);
        this.update(ids);
    }

    scale(ids : Iterable<string>, dx : number, dy : number) : void {
        super.scale(ids, dx, dy);
        this.update(ids);
    }

    update(ids : Iterable<string>) : void {
        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;

            const min = this.getCellIndex(item.rect.x, item.rect.y);
            const max = this.getCellIndex(item.rect.x + item.rect.w, item.rect.y + item.rect.h);

            if (item.cell.min === min && item.cell.max === max)
                continue;

            this.removeFromGrid([id]);
            this.addToGrid([item]);
        }
    }

    remove(ids : Iterable<string>) : void {
        this.removeFromGrid(ids);
        super.remove(ids);
    }

    removeFromGrid(ids : Iterable<string>) : void {
        for (const id of ids) {
            const item = this.items.get(id);
            if (!item)
                continue;
            const { min, max } = item.cell;

            for (let { x } = min; x <= max.x; ++x)
                for (let { y } = min; y <= max.y; ++y) {
                    const key = this.hash(x, y);
                    const cell = this.cells.get(key);
                    if (cell)
                        cell.delete(item);
                }
        }
    }

    clear() : void {
        super.clear();
        this.cells.clear();
    }

    getItemsCloseToRect(rect : Rect) : Set<BoardItem> {
        const min = this.getCellIndex(rect.x, rect.y);
        const max = this.getCellIndex(rect.x + rect.w, rect.y + rect.h);

        const items = new Set<BoardItem>();

        for (let { x } = min; x <= max.x; ++x)
            for (let { y } = min; y <= max.y; ++y) {
                const key = this.hash(x, y);
                const cell = this.cells.get(key);
                if (cell)
                    for (const item of cell.values())
                        items.add(item);
            }

        return items;
    }

    getItemsCloseToPoint(point : Point) : Set<BoardItem> {
        const coord = this.getCellIndex(point.x, point.y);
        const items = new Set<BoardItem>();

        for (let x = coord.x - 1; x <= coord.x + 1; ++x)
            for (let y = coord.y - 1; y <= coord.y + 1; ++y) {
                const key = this.hash(x, y);
                const cell = this.cells.get(key);
                if (cell)
                    for (const item of cell.values())
                        items.add(item);
            }

        return items;
    }

    draw() : void {
        const items = Array.from(this.getItemsCloseToRect(this.viewport.getScreenRect())).sort((a, b) => a.zIndex - b.zIndex);
        for (const item of items)
            item.draw();
    }

    private getCellIndex(x : number, y : number) : Point {
        return new Point(Math.floor(x / ClientBoard.BOARD_CELL_SIZE), Math.floor(y / ClientBoard.BOARD_CELL_SIZE));
    }

    private hash(x : number, y : number) : string {
        return `${x}_${y}`;
    }
}