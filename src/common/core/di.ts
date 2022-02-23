import "reflect-metadata";

export class Service {
    start() : void {};
    stop() : void {};
}

export enum Lifetime {
    Singleton,
    Transient
}

export type InjectableContructor = new(...args : any[]) => Service;
export type InjectableCondition = () => boolean;

interface InjectableEntry {
    Ctor : InjectableContructor;
    instance : Service | null;
    lifetime : Lifetime;
}

export class Container {
    private static readonly registry = new Map<InjectableContructor, InjectableEntry>();

    static register(Ctor : InjectableContructor, lifetime : Lifetime) : void {
        this.registry.set(Ctor, {
            Ctor,
            instance: null,
            lifetime,
        });
    }

    static implementation(Base : InjectableContructor, Ctor : InjectableContructor) : void {
        const entry = this.registry.get(Base);
        if (!entry)
            throw new Error("Implementation for unknown base injectable");
        entry.Ctor = Ctor;
    }

    static get<T extends Service>(Ctor : InjectableContructor) : T {
        const entry = this.registry.get(Ctor);
        if (!entry)
            throw new Error("Resolving unknown injectable");
        if (entry.lifetime === Lifetime.Singleton && entry.instance)
            return entry.instance as T;

        const args : Service[] = [];
        const params = Reflect.getMetadata("design:paramtypes", Ctor) as (InjectableContructor)[];
        if (params)
            for (const param of params)
                args.push(Container.get(param));
        const instance = new entry.Ctor(...args) as T;
        if (entry.lifetime === Lifetime.Singleton)
            entry.instance = instance;
        return instance;
    }

    static start() : void {
        for (const service of Container.registry.values())
            if (service.instance)
                service.instance.start();
    }

    static stop() : void {
        for (const service of Container.registry.values())
            if (service.instance)
                service.instance.stop();
    }
}

export function Injectable(lifetime : Lifetime) : (Ctor : InjectableContructor) => void {
    return (Ctor : InjectableContructor) : void => {
        Container.register(Ctor, lifetime);
    };
}

export function ImplementationFor(Base : InjectableContructor, condition?: InjectableCondition) : (Ctor : InjectableContructor) => void {
    return (Ctor : InjectableContructor) : void => {
        if (!condition || condition())
            Container.implementation(Base, Ctor);
    };
}
