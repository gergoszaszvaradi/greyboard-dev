interface Delegate<Args extends any[]> {
    functions : Array<(...args : Args) => void>;
    add(func : (...args : Args) => void) : void;
    clear() : void;
    invoke(...args : Args) : void;
    (...args : Args): void;
}

export default function createDelegate<Args extends any[]>() : Delegate<Args> {
    const instance = ((...args : Args) => { instance.invoke(...args); }) as Delegate<Args>;
    instance.functions = [];
    instance.add = (func : (...args : Args) => void) => {
        instance.functions.push(func);
    };
    instance.clear = () : void => {
        instance.functions.splice(0, instance.functions.length);
    };
    instance.invoke = (...args : Args) => {
        for (const func of instance.functions) func(...args);
    };
    return instance;
}
