const LOGGER_LEVELS: {
    readonly error: number,
    readonly warning: number,
    readonly info: number,
    readonly http: number,
    readonly debug: number

} = {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4
}
const LOGGER_COLORS: {
    readonly error: string,
    readonly warning: string,
    readonly info: string,
    readonly http: string,
    readonly debug: string

} = {
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
}

export {
    LOGGER_LEVELS,
    LOGGER_COLORS
}