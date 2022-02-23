import { nanoid } from "nanoid";

export default class Id {
    private readonly id : string;

    constructor() {
        this.id = nanoid(8);
    }

    toString() : string {
        return this.id;
    }
}
