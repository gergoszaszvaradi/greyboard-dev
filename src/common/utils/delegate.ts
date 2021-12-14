interface Delegate<Args extends any[]> {
    readonly functions : Array<(...args : Args) => void>;
    add(func : (...args : Args) => void) : void;
    invoke(...args : Args) : void;
    (...args : Args): void;
}

export default function createDelegate<Args extends any[]>() : Delegate<Args> {
    const instance = ((...args : Args) => { instance.invoke(...args); }) as Delegate<Args>;
    instance.add = (func : (...args : Args) => void) => {
        instance.functions.push(func);
    };
    instance.invoke = (...args : Args) => {
        for (const func of instance.functions) func(...args);
    };
    return instance;
}
