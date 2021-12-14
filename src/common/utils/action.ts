interface Action<Args extends any[]> {
    (...args : Args): void;
}

export default function createAction<Args extends any[]>(callback : (...args : Args) => void) : Action<Args> {
    return ((...args : Args) => { callback(...args); }) as Action<Args>;
}
