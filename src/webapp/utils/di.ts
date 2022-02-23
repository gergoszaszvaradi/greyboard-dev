import { Container, InjectableContructor, Service } from "../../common/core/di";

export default function useInjectable<T extends Service>(Ctor : InjectableContructor) : T {
    return Container.get<T>(Ctor);
}
