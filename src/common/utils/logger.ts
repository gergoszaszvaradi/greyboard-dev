export enum LogLevel {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 4,
    All = 0xFFFF,
}

export interface LoggerConfig {
    logLevel : LogLevel;
}

const DEFAULT_CONFIG : LoggerConfig = {
    logLevel: LogLevel.All,
};

export default class Logger {
    private static config : LoggerConfig = DEFAULT_CONFIG;

    static init(config : Partial<LoggerConfig>) : void {
        Logger.config = { ...DEFAULT_CONFIG, ...config };
    }

    static getStackTrace() : string[] {
        const stack = new Error().stack || "";
        return stack.split("\n").map((x) => x.trim()).filter((x) => x.length > 0);
    }

    static getSimpleStackTrace() : string[] {
        const stack = new Error().stack || "";
        return stack.split("\n").map((x) => x.replace(/at |\(.*\)|@.*/g, "").trim()).filter((x) => x.length > 0);
    }

    static printStackTrace() : void {
        console.log(new Error().stack || "");
    }

    static debug<T>(message : string, data? : T) : void {
        if ((this.config.logLevel & LogLevel.Debug) !== LogLevel.Debug)
            return;
        if (data)
            console.debug(`DEBUG | ${this.getSimpleStackTrace()[3]} | ${message}`, data);
        else
            console.debug(`DEBUG | ${this.getSimpleStackTrace()[3]} | ${message}`);
    }

    static info<T>(message : string, data? : T) : void {
        if ((this.config.logLevel & LogLevel.Info) !== LogLevel.Info)
            return;
        if (data)
            console.log(`INFO | ${this.getSimpleStackTrace()[3]} | ${message}`, data);
        else
            console.log(`INFO | ${this.getSimpleStackTrace()[3]} | ${message}`);
    }

    static warn<T>(message : string, data? : T) : void {
        if ((this.config.logLevel & LogLevel.Warning) !== LogLevel.Warning)
            return;
        if (data)
            console.warn(`WARN | ${this.getSimpleStackTrace()[3]} | ${message}`, data);
        else
            console.warn(`WARN | ${this.getSimpleStackTrace()[3]} | ${message}`);
    }

    static error<T>(message : string, data? : T) : void {
        if ((this.config.logLevel & LogLevel.Error) !== LogLevel.Error)
            return;
        if (data)
            console.error(`ERROR | ${this.getSimpleStackTrace()[3]} | ${message}`, data);
        else
            console.error(`ERROR | ${this.getSimpleStackTrace()[3]} | ${message}`);
    }
}
