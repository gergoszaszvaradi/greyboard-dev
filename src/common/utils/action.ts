type Action<Args extends unknown[]> = (...args : Args) => void;

export default function createAction<Args extends unknown[]>(callback : (...args : Args) => void) : Action<Args> {
    return ((...args : Args) => { callback(...args); }) as Action<Args>;
}
