import Reflux from "reflux";

export function createRefluxActions<T>(Class : {new (): T}) : T {
    const funcs = Object.getOwnPropertyNames(Class.prototype);
    return Reflux.createActions(funcs.filter((func) => func !== "constructor")) as T;
}
