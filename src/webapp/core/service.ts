export class Service {
    start() : void {};
    stop() : void {};
}

export enum Lifetime {
    Singleton,
    Transient,
}
interface InjectableService {
    lifetime : Lifetime;
    instance : Service | null;
}
const services = new Map<typeof Service, InjectableService>();

export function Injectable<T extends Service>(lifetime : Lifetime) : (Class : new () => T) => void {
    return (Class : new () => T) : void => {
        services.set(Class, {
            lifetime,
            instance: lifetime === Lifetime.Transient ? new Class() : null,
        });
    };
}

export function Inject<T extends Service>(Class : new () => T) {
    return (target : object, propertyKey : string) : void => {
        const service = services.get(Class);
        if (!service)
            throw new Error("Unknown injectable service");
        Object.defineProperty(target, propertyKey, {
            get: () => (service.instance || new Class()),
            set: () => {},
        });
    };
}
