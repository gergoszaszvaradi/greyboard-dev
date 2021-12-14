export function px(value : number) : string {
    return `${value}px`;
}

export function abbreviate(value : string) : string {
    return value.split(" ").reduce((abbr, word) => abbr + word.charAt(0), "");
}
