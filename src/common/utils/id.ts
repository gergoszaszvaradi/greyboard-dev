import { nanoid } from "nanoid";

export default class Id {
    private readonly id : string;

    constructor() {
        this.id = nanoid(16);
    }

    toString() : string {
        return this.id;
    }
}
