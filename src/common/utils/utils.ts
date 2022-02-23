export function inRange(x : number, a : number, b : number) : boolean {
    return x >= a && x <= b;
}

export function map(x : number, sa : number, sb : number, da : number, db : number) : number {
    return ((x - Math.min(sa, sb)) / (Math.max(sa, sb) - Math.min(sa, sb))) * (Math.max(da, db) - Math.min(da, db)) + Math.min(da, db);
}
