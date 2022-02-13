export default class Color {
    constructor(public r : number = 0, public g : number = 0, public b : number = 0, public a : number = 255) {}

    static fromUInt(color : number) : Color {
        return new Color(color & 0xFF000000, color & 0x00FF0000, color & 0x0000FF00, color & 0x000000FF);
    }

    static fromHex(color : string) : Color {
        let hex = color.substring(1);
        if (hex.length === 6)
            hex += "FF";
        return this.fromUInt(parseInt(hex, 16));
    }

    toUInt() : number {
        return this.r << 32 + this.g << 16 + this.b << 8 + this.a;
    }

    toHex() : string {
        return `#${this.toUInt().toString(16)}`;
    }
}
