import { nanoid } from "nanoid";

export default class Id {
    private id : string;

    constructor() {
        this.id = nanoid(16);
    }

    toString() : string {
        return this.id;
    }
}
