import { useEffect, useState } from "react";
import createDelegate from "../../common/utils/delegate";

class Store<S> {
    public onStateChanged = createDelegate<[S]>();
    constructor(public state : S) {};

    setState(state : S) : void {
        this.state = state;
        this.onStateChanged(state);
    }
}

type Actions<F, S> = F & { store : Store<S> }

export function createStore<S>(state : S) : Store<S> {
    return new Store<S>(state);
}

export function createActions<F, S>(Actions : new () => F, store : Store<S>) : Actions<F, S> {
    const funcs = new Actions();
    const actions : {[key : string] : unknown} = {};
    for (const name of Object.getOwnPropertyNames(Actions.prototype))
        actions[name] = (...args : unknown[]) : void => { (Reflect.get(funcs as unknown as object, name) as (..._args : unknown[]) => void)(...args); };
    return { store, ...(actions as unknown as F) };
}

export function useStore<S>(store : Store<S>) : S {
    const [state, setState] = useState(store.state);
    useEffect(() : () => void => {
        store.onStateChanged.add(setState);
        return () : void => {
            store.onStateChanged.remove(setState);
        };
    });
    return state;
}
