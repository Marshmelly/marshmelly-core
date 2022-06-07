import winston from "winston";
const dateFormat = Intl.DateTimeFormat("en", { dateStyle: "short", timeStyle: "medium", hour12: false });

function formatDateForLogFile(date?: number | Date): string {
    const data = dateFormat.formatToParts(date);
    return `<year>-<month>-<day>-<hour>-<minute>-<second>`
        .replace(/<year>/g, data.find(({ type }) => type === "year")!.value)
        .replace(/<month>/g, data.find(({ type }) => type === "month")!.value)
        .replace(/<day>/g, data.find(({ type }) => type === "day")!.value)
        .replace(/<hour>/g, data.find(({ type }) => type === "hour")!.value)
        .replace(/<minute>/g, data.find(({ type }) => type === "minute")!.value)
        .replace(/<second>/g, data.find(({ type }) => type === "second")!.value);
}

export function createLogger(serviceName: string, debug: Boolean) {
    const logger = winston.createLogger({
        defaultMeta: {
            serviceName
        },

        //Format
        format: winston.format.combine(
            winston.format.printf(info => {
                const {level, message, stack} = info;
                const prefix= `[${dateFormat.format(Date.now())}] [${level}]`
                return `${prefix} ${message}`
            })
        ),

        //Level Configuration
        level: debug ? "debug":"info",
        levels: {
            info:5,
            notice:4,
            debug:3,
            warn:2,
            alert:1,
            error:0,
        },

        //Log Files
        transports: [
            new winston.transports.File({ filename: `logs/${serviceName}/error-${formatDateForLogFile(Date.now())}.log`, level: "error" }),
            new winston.transports.File({ filename: `logs/${serviceName}/logs-${formatDateForLogFile(Date.now())}.log` })
        ]
    })

    logger.add(new winston.transports.Console({
        level: debug ? "debug" : "info",
        format: winston.format.combine(
            winston.format.printf(info => {
                const { level, message, stack } = info;
                const prefix = `[${dateFormat.format(Date.now())}] [${level}]`;
                if (["error", "alert"].includes(level)) return `${prefix}: ${stack}`;
                return `${prefix}: ${message}`;
            }),
            winston.format.align(),
            winston.format.colorize({ all: true })
        )
    }));
    
    return logger;
}