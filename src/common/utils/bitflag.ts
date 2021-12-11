export default class BitFlag {
    private value : number;

    constructor(value : number = 0) {
        this.value = value;
    }

    add(bit : number) : void {
        this.value |= bit;
    }

    has(bit : number) : boolean {
        return (this.value & bit) === bit;
    }
}
