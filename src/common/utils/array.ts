export function groupBy<T, K extends T[keyof T]>(arr : T[], key : (x : T) => K) : Map<K, T[]> {
    const result : Map<K, T[]> = new Map();
    for (const item of arr) {
        const k = key(item);
        const collection = result.get(k);
        if (!collection) {
            result.set(k, [item]);
        } else {
            collection.push(item);
        }
    }
    return result;
}
