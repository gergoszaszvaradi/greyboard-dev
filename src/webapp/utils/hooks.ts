import { useEffect } from "react";
import { Container, InjectableContructor, Service } from "../../common/core/di";

export function useInjectable<T extends Service>(Ctor : InjectableContructor) : T {
    return Container.get<T>(Ctor);
}

export function useGlobalEventListener<T extends keyof GlobalEventHandlersEventMap>(event : T, listener: (e: GlobalEventHandlersEventMap[T]) => void) : void {
    useEffect(() => {
        document.addEventListener(event, listener);
        return () => {
            document.removeEventListener(event, listener);
        };
    }, [event]);
}
