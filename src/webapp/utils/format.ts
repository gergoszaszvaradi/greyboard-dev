export function px(value : number) : string {
    return `${value}px`;
}

export function abbreviate(value : string) : string {
    return value.split(" ").reduce((abbr, word) => abbr + word.charAt(0), "");
}

export function className(condition : boolean | undefined | null, cls : string) : string {
    return condition ? cls : "";
}
